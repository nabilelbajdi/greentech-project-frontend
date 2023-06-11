import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../../server/db/prisma';
import fs from 'fs';

const profilePictureHandler = async (req, res) => {
  const body = req.body;

  try {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      const prismaUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!prismaUser) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const image = body.image;

      const dbImage = await prisma.image.findUnique({
        where: { id: image[0] },
      });

      if (prismaUser.profilePicture) {
        console.log(prismaUser.profilePicture);
        const test = await prisma.image.delete({
          where: {
            url: prismaUser.profilePicture,
          },
        });
        console.log(test);
        fs.rmSync('public/' + test.url, { recursive: true }, (err) => {
          if (err) {
            console.error(err.message);
            return;
          }
        });
      }

      await prisma.user.update({
        where: { email: session.user.email },
        data: {
          profilePicture: dbImage.url,
        },
      });

      req.status(200).send('Done');
    } else {
      res.status(403).end('You must be signed in to do this.');
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export default profilePictureHandler;
