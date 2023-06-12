import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../../server/db/prisma';

const likeHandler = async (req, res) => {
  const body = req.body;

  try {
    const session = await getServerSession(req, res, authOptions);
    const { method } = req;
    const likedById = session.user.id;
    const postId = body.postId;
    if (session) {
      const prismaUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!prismaUser) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      switch (method) {
        case 'POST':
          let likeStatus;
          let userPath;

          const isAlreadyLiked = await prisma.like.findMany({
            where: { post_id: postId, liked_by_id: likedById },
          });

          if (isAlreadyLiked.length === 0) {
            const createdLike = await prisma.like.create({
              data: {
                post_id: postId,
                liked_by_id: likedById,
              },
            });

            const targetPost = await prisma.post.findUnique({
              where: { id: postId },
              select: {
                author_id: true,
                author: true
              }
            })

            console.log('before targtePost');

            if (targetPost) {
              console.log(targetPost)
              const oldNotification = await prisma.notification.findMany({
                where: { targetPost_id: postId },
              })
              console.log('after targtePost');
              console.log(oldNotification)
              if (oldNotification.length > 0) {
                console.log('old blip')


                await prisma.notification.delete({
                  where: { id: oldNotification[0].id }
                })

              }

              const notification = await prisma.notification.create({
                data: {
                  to_id: targetPost.author_id,
                  from_id: likedById,
                  targetPost_id: postId,
                  type: 'like post',
                }
              })

              userPath = targetPost.author.userPath;

            }

            likeStatus = true;
          } else {
            const deletedLike = await prisma.like.delete({
              where: { id: isAlreadyLiked[0].id },
            });
            likeStatus = false;
          }
          const totalLikes = await prisma.post.findMany({
            where: { id: postId },
            include: { likes: true },
          });

          return res
            .status(200)
            .json({ likes: totalLikes[0].likes, likeStatus, userPath });

        default:
          res.status(405).send();
      }
    } else {
      res.status(403).end('You must be signed in to do this.');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
};

export default likeHandler;
