import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import prisma from '../../../../../server/db/prisma';

const postQueryHandler = async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const { method } = req;
    const postId = req.query.postId;

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
          const post = await prisma.post.findFirst({
            where: { id: postId },
            select: { text: true },
          });

          return res.status(200).json(post);

        case 'DELETE':
          const deleteId = req.query.postId;
          const deletedPost = await prisma.post.delete({
            where: { id: deleteId },
          });

          return res.status(200).json(deletedPost);

        case 'PUT':
          const text = req.body.text;

          const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { text: text },
          });

          return res.status(200).json(updatedPost);

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

export default postQueryHandler;
