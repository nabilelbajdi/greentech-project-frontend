import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '../../server/db/prisma';

// All props to the event pages goes here

const getEventSlugPageProps = async (context) => {
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
      admin: {
        select: {
          firstName: true,
          lastName: true,
          image: true,
          userPath: true,
        },
      },
      posts: {
        orderBy: {
          created: 'desc',
        },
        include: {
          comments: {
            include: {
              author: {
                select: {
                  firstName: true,
                  lastName: true,
                  image: true,
                  userPath: true,
                },
              },
            },
          },
          author: {
            select: {
              firstName: true,
              lastName: true,
              image: true,
              userPath: true,
            },
          },
          likes: true,
          images: true,
        },
      },
      image: true,
    },
  });

  return {
    props: {
      session,
      event: JSON.parse(JSON.stringify(event)),
    },
  };
};
export default getEventSlugPageProps;
