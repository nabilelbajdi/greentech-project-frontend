import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '../../server/db/prisma';

// All props to the event pages goes here

const getHomePageProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const slug = context.query.slug;

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
