import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '../../server/db/prisma';

const getProfilePageProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const slug = context.query.profileSlug;

  const user = await prisma.user.findUnique({
    where: { userPath: slug },
    select: {
      userPath: true,
      id: true,
      firstName: true,
      lastName: true,
      image: true,
      posts: {
        orderBy: {
          created: 'desc',
        },
        include: {
          comments: {
            include: { author: { select: { name: true, image: true } } },
          },
          author: { select: { name: true, image: true } },
          likes: true,
          images: true,
        },
      },
      friends: {
        select: {
          userPath: true,
          firstName: true,
          lastName: true,
          image: true,

        }
      },
      friendRequests: {
        select: {
          userPath: true,
        }
      },
      friendRequestsSent: {
        select: {
          userPath: true,
        }
      },
      eventsCreated: true,
    },
  });

  if (user) {

    if (user.friends.filter(friend => friend.userPath === session.user.userPath).length > 0) {

      user.isFriend = true;

    } else if (user.friendRequests.filter(friend => friend.userPath === session.user.userPath).length > 0) {

      user.hasSentFriendRequest = true;

    } else if (user.friendRequestsSent.filter(friend => friend.userPath === session.user.userPath).length > 0) {

      user.hasFriendRequest = true;

    }

  }

  return {
    props: {
      session,
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};
export default getProfilePageProps;
