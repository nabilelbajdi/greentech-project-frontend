import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import prisma from '../../../../../server/db/prisma';

const donationQueryHandler = async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const { method } = req;
    const body = req.body;
    const donationId = req.query.donationId;

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
          const donation = await prisma.donation.findUnique({
            where: { id: donationId },
          });

          return res.status(200).json(donation);

        case 'DELETE':
          const deletedDonation = await prisma.donation.delete({
            where: { id: donationId },
          });

          return res.status(200).json(deletedDonation);

        case 'PUT':
          const donationInfo = body.itemInfo;

          const updatedDonation = await prisma.donation.update({
            where: { id: donationId },
            data: {
              name: donationInfo.name,
              description: donationInfo.description,
              category: donationInfo.category,
              condition: donationInfo.condition,
              start_date: donationInfo.startDate,
              start_time: donationInfo.startTime,
              address: donationInfo.address,
              lat: donationInfo.lat,
              lng: donationInfo.lng,
            },
          });
          if (donationInfo.image) {
            await prisma.image.update({
              where: {
                id: donationInfo.image,
              },
              data: {
                donation_id: updatedDonation.id,
              },
            });
          }

          return res.status(200).json(updatedDonation);

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

export default donationQueryHandler;
