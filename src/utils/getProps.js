import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

const getProps = async (context) => {
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

  return {
    props: {
      session,
    },
  };
};

export default getProps;
