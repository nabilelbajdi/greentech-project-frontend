import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '../../server/db/prisma';

// All props to the event pages goes here

const getHomePageProps = async (context) => {

  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }



  if (!session.user.fullyRegistered) {
    return {
      redirect: {
        destination: '/register',
        permanent: false,
      },
    };
  }

  const posts = await prisma.post.findMany({
    orderBy: {
      created: 'desc',
    },
    where: { event_id: null },
    include: {
      comments: {
        include: { author: { select: { name: true, image: true } } },
      },
      author: { select: { name: true, image: true } },
      likes: true,
      images: true,
    },
  });

  return {
    props: {
      session,
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
export default getHomePageProps;
