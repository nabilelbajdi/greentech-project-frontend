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
            orderBy: {
              created: 'desc',
            },
            where: {
              author_id: authorId,
            },
            include: {
              comments: true,
            },
          });

          return res.status(200).json(posts);
        case 'POST':
          const text = body.text;
          const eventId = body.event_id;
          const createdPost = await prisma.post.create({
            data: {
              text: text,
              author_id: authorId,
              event_id: eventId,
            },
            include: {
              comments: true,
              author: { select: { name: true, image: true } },
              likes: true,
              images: true,
            },
          });

          if (body.images) {
            for (let i = 0; i < body.images.length; i++) {
              const dbImage = await prisma.image.update({
                where: {
                  id: body.images[i],
                },
                data: {
                  post_id: createdPost.id,
                },
              });
              createdPost.images.push(dbImage);
            }
          }
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
