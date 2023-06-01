import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '../../server/db/prisma';

// All props to the event pages goes here

const getDonationPageProps = async (context) => {
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

  const donations = await prisma.donation.findMany({
    orderBy: {
      created: 'desc',
    },
    include: {
      user: { select: { firstName: true, lastName: true, image: true } },
      images: true,
    },
  });

  return {
    props: {
      session,
      donations: JSON.parse(JSON.stringify(donations)),
    },
  };
};
export default getDonationPageProps;
