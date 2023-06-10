import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '../../server/db/prisma';

const getGroupPageProps = async (context) => {
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

  const groups = await prisma.group.findMany();

  return {
    props: {
      session,
      groupsLength: JSON.parse(JSON.stringify(groups.length)),
    },
  };
};
export default getGroupPageProps;
