import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import prisma from '../../../../../server/db/prisma';

const postQueryHandler = async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const { method } = req;
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
          const getId = req.query;
          const posts = await prisma.post.findMany({
            where: { author_id: getId },
          });

          return res.status(200).json(posts);

        case 'DELETE':
          const deleteId = req.query.postId;
          const deletedPost = await prisma.post.delete({
            where: { id: deleteId },
          });

          return res.status(200).json(deletedPost);

        //Add PUT request here later to change a single post
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
