import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import prisma from '../../../../../server/db/prisma';

const groupQueryHandler = async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const { method } = req;
    const body = req.body;
    const groupId = req.query.groupId;

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
          const group = await prisma.group.findUnique({
            where: { id: groupId },
          });

          return res.status(200).json(group);

        case 'DELETE':
          const deletedGroup = await prisma.group.delete({
            where: { id: groupId },
          });

          return res.status(200).json(deletedGroup);

        case 'PUT':
          const groupInfo = body.itemInfo;

          const updatedGroup = await prisma.group.update({
            where: { id: groupId },
            data: {
              name: groupInfo.name,
              description: groupInfo.description,
              start_date: groupInfo.startDate,
              start_time: groupInfo.startTime,
              address: groupInfo.address,
              lat: groupInfo.lat,
              lng: groupInfo.lng,
            },
          });
          if (groupInfo.image) {
            await prisma.image.update({
              where: {
                id: groupInfo.image,
              },
              data: {
                group_id: updatedGroup.id,
              },
            });
          }

          return res.status(200).json(updatedGroup);

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

export default groupQueryHandler;
