import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../../server/db/prisma';

const donationHandler = async (req, res) => {
  const body = req.body;
  const { query } = req;
  const page = query.page;

  try {
    const session = await getServerSession(req, res, authOptions);
    const { method } = req;
    const userId = session.user.id;
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
          const donations = await prisma.donation.findMany({
            orderBy: {
              created: 'desc',
            },
            include: {
              user: {
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

          return res.status(200).json(donations);
        case 'POST':
          const donationInfo = body.itemInfo;

          const createdDonation = await prisma.donation.create({
            data: {
              user_id: userId,
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
                donation_id: createdDonation.id,
              },
            });
          }

          return res.status(200).json(createdDonation);

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

export default donationHandler;
