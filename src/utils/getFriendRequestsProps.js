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



  if (!session.user.fullyRegistered) {
    return {
      redirect: {
        destination: '/register',
        permanent: false,
      },
    };
  }

  const requests = await prisma.user.findUnique({

    where: { id: session.user.id },
    select: {
      friendRequests: true,
      friendRequestsSent: true,
    }

  });

  return {
    props: {
      session,
      friendRequests: JSON.parse(JSON.stringify(requests)),
    },
  };
};
export default getHomePageProps;
