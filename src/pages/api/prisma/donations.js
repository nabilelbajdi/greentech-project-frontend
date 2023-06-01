import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../../server/db/prisma';

const donationHandler = async (req, res) => {
  const body = req.body;

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
        // const posts = await prisma.post.findMany({
        //   orderBy: {
        //     created: 'desc',
        //   },
        //   where: {
        //     author_id: authorId,
        //   },
        //   include: {
        //     comments: true,
        //   },
        // });

        // return res.status(200).json(posts);
        case 'POST':
          const donationInfo = body.donationInfo;

          const createdDonation = await prisma.donation.create({
            data: {
              user_id: userId,
              name: donationInfo.name,
              description: donationInfo.description,
              category: donationInfo.category,
              condition: donationInfo.condition,
              pickUpDate: donationInfo.pickUpDate,
              pickUpTime: donationInfo.pickUpTime,
              pickUpLocation: donationInfo.pickUpLocation,
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
