import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../../server/db/prisma';

const eventHandler = async (req, res) => {
  const body = req.body;
  const { query } = req;
  const page = query.page;

  try {
    const session = await getServerSession(req, res, authOptions);
    const { method } = req;
    const adminId = session.user.id;
    if (session) {
      const prismaUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!prismaUser) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      switch (method) {
        case 'GET':
          const events = await prisma.event.findMany({
            orderBy: {
              created: 'desc',
            },
            include: {
              admin: {
                select: {
                  firstName: true,
                  lastName: true,
                  image: true,
                },
              },
            },
            take: 6,
            skip: (page - 1) * 6,
          });

          return res.status(200).json(events);

        case 'POST':
          const eventInfo = body.itemInfo;

          const createdEvent = await prisma.event.create({
            data: {
              admin_id: adminId,
              name: eventInfo.name,
              start_date: eventInfo.startDate,
              end_date: eventInfo.endDate,
              start_time: eventInfo.startTime,
              end_time: eventInfo.endTime,
              address: eventInfo.address,
              lat: eventInfo.lat,
              lng: eventInfo.lng,
              description: eventInfo.description,
            },
          });
          if (eventInfo.image) {
            await prisma.image.update({
              where: {
                id: eventInfo.image,
              },
              data: {
                event_id: createdEvent.id,
              },
            });
          }

          console.log(createdEvent);
          return res.status(200).json(createdEvent);

        // if (body.images) {
        //   for (let i = 0; i < body.images.length; i++) {
        //     const dbImage = await prisma.image.update({
        //       where: {
        //         id: body.images[i],
        //       },
        //       data: {
        //         post_id: createdPost.id,
        //       },
        //     });
        //     createdPost.images.push(dbImage);
        //   }
        // }

        default:
          res.status(405).send();
      }
    } else {
      res.status(403).end('You must be signed in to do this.');
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export default eventHandler;
