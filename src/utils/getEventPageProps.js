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

  if (!session.user.fullyRegistered) {
    return {
      redirect: {
        destination: '/register',
        permanent: false,
      },
    };
  }

  const events = await prisma.event.findMany({
    orderBy: {
      created: 'desc',
    },
    include: {
      admin: { select: { firstName: true, lastName: true, image: true } },
      image: true,
    },
  });

  return {
    props: {
      session,
      events: JSON.parse(JSON.stringify(events)),
    },
  };
};
export default getEventPageProps;
