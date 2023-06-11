import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import fs from 'fs';
import prisma from '../../../../../server/db/prisma';

const searchQueryHandler = async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const { method } = req;
    const searchInput = req.query.slug;

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
          try {
            const users = await prisma.user.findMany({
              where: {
                OR: [
                  {
                    firstName: {
                      contains: searchInput,
                    },
                  },
                  {
                    lastName: {
                      contains: searchInput,
                    },
                  },
                ],
              },
              select: {
                firstName: true,
                lastName: true,
                image: true,
                userPath: true,
              },
            });

            const events = await prisma.event.findMany({
              where: {
                name: {
                  contains: searchInput,
                },
              },
            });

            const groups = await prisma.group.findMany({
              where: {
                name: {
                  contains: searchInput,
                },
              },
            });

            const donations = await prisma.donation.findMany({
              where: {
                name: {
                  contains: searchInput,
                },
              },
            });

            const results = {
              users,
              events,
              groups,
              donations,
            };

            return res.status(200).json(results);
          } catch (error) {
            console.log(error);
          }

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

export default searchQueryHandler;
