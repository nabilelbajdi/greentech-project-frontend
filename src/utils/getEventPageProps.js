import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '../../server/db/prisma';

// All props to the event pages goes here

const getEventPageProps = async (context) => {
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

  const event = await prisma.event.findUnique({
    where: { id: slug },
    include: {
      admin: { select: { name: true, image: true } },
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
    },
  });

  return {
    props: {
      session,
      event: JSON.parse(JSON.stringify(event)),
    },
  };
};
export default getEventPageProps;
