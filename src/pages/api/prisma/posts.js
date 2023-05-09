import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../../server/db/prisma';

const postHandler = async (req, res) => {
  const body = req.body;

  try {
    const session = await getServerSession(req, res, authOptions);
    const { method } = req;
    const authorId = session.user.id;
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
          const posts = await prisma.post.findMany({
            where: { author_id: authorId },
          });

          return res.status(200).json(posts);
        case 'POST':
          const text = body.text;
          const createdPost = await prisma.post.create({
            data: { text: text, author_id: authorId },
          });

          return res.status(200).json(createdPost);
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

export default postHandler;
