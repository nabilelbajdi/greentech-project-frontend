import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import prisma from '../../../../../server/db/prisma';

const eventQueryHandler = async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const { method } = req;
    const body = req.body;
    const eventId = req.query.eventId;

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
          const event = await prisma.event.findUnique({
            where: { id: eventId },
          });

          return res.status(200).json(event);

        case 'DELETE':
          const deletedEvent = await prisma.event.delete({
            where: { id: eventId },
          });

          return res.status(200).json(deletedEvent);

        case 'PUT':
          const eventInfo = body.eventInfo;
          // let startDate;
          // let endDate;

          // if (eventInfo.startDate) {
          //   startDate = eventInfo.startDate.substring(0, 10);
          //   let correctStartDate = parseInt(startDate.slice(-2)) + 1;
          //   if (correctStartDate < 10) {
          //     correctStartDate = '0' + correctStartDate.toString();
          //   } else {
          //     correctStartDate.toString();
          //   }
          //   startDate =
          //     startDate.substring(0, 8) +
          //     correctStartDate +
          //     eventInfo.startDate.slice(-14);
          // }

          // if (eventInfo.endDate) {
          //   endDate = eventInfo.endDate.substring(0, 10);
          //   let correctEndDate = parseInt(endDate.slice(-2)) + 1;
          //   if (correctEndDate < 10 && correctEndDate !== 0) {
          //     correctEndDate = '0' + correctEndDate.toString();
          //   } else if (correctEndDate === 0) {
          //     correctEndDate = '3' + correctEndDate.toString();
          //   } else {
          //     correctEndDate.toString();
          //   }
          //   endDate =
          //     endDate.substring(0, 8) +
          //     correctEndDate +
          //     eventInfo.endDate.slice(-14);
          //   endDate =
          //     endDate.substring(0, 8) +
          //     correctEndDate +
          //     eventInfo.endDate.slice(-14);
          // } else {
          //   endDate = null;
          // }

          const updatedEvent = await prisma.event.update({
            where: { id: eventId },
            data: {
              name: eventInfo.name,
              description: eventInfo.description,
              start_date: eventInfo.startDate,
              end_date: eventInfo.endDate,
              start_time: eventInfo.startTime,
              end_time: eventInfo.endTime,
              address: eventInfo.address,
              lat: eventInfo.lat,
              lng: eventInfo.lng,
            },
          });
          if (eventInfo.image) {
            await prisma.image.update({
              where: {
                id: eventInfo.image,
              },
              data: {
                event_id: updatedEvent.id,
              },
            });
          }

          return res.status(200).json(updatedEvent);

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

export default eventQueryHandler;
