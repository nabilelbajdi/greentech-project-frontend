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
      eventsCreated: true,
    },
  });

  return {
    props: {
      session,
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};
export default getProfilePageProps;