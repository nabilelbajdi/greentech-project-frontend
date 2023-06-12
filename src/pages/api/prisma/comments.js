import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../../server/db/prisma';

const commentHandler = async (req, res) => {
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
          const comments = await prisma.post.findMany();

          return res.status(200).json(comments);
        case 'POST':
          const text = body.text;
          const postId = body.postId;
          const createdComment = await prisma.comment.create({
            data: {
              text: text,
              author_id: authorId,
              post_id: postId,
            },
            include: {
              author: {
                select: {
                  firstName: true,
                  lastName: true,
                  image: true,
                  userPath: true,
                  profilePicture: true,
                },
              },
            },
          });

          return res.status(200).json(createdComment);
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

export default commentHandler;
