import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../../server/db/prisma';

const groupHandler = async (req, res) => {
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
          const groups = await prisma.group.findMany({
            orderBy: {
              created: 'desc',
            },
            include: {
              admin: {
                select: {
                  firstName: true,
                  lastName: true,
                  image: true,
                  userPath: true,
                  profilePicture: true,
                },
              },
            },
            take: 6,
            skip: page ? (page - 1) * 6 : 0,
          });

          return res.status(200).json(groups);

        case 'POST':
          const groupInfo = body.itemInfo;
          console.log(groupInfo);

          const createdGroup = await prisma.group.create({
            data: {
              admin_id: adminId,
              name: groupInfo.name,
              start_date: groupInfo.startDate,
              start_time: groupInfo.startTime,
              address: groupInfo.address,
              lat: groupInfo.lat,
              lng: groupInfo.lng,
              description: groupInfo.description,
            },
          });

          if (groupInfo.image) {
            await prisma.image.update({
              where: {
                id: groupInfo.image,
              },
              data: {
                group_id: createdGroup.id,
              },
            });
          }

          console.log(createdGroup);
          return res.status(200).json(createdGroup);

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

export default groupHandler;
