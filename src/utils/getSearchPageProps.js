import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '../../server/db/prisma';

const getSearchPageProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const searchInput = context.query.input;

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: searchInput,
          },
        },
        {
          lastName: {
            contains: searchInput,
          },
        },
      ],
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      image: true,
      userPath: true,
      city: true,
    },
  });

  const events = await prisma.event.findMany({
    where: {
      name: {
        contains: searchInput,
      },
    },
    include: {
      image: true,
    },
  });

  const groups = await prisma.group.findMany({
    where: {
      name: {
        contains: searchInput,
      },
    },
    include: {
      image: true,
    },
  });

  const donations = await prisma.donation.findMany({
    where: {
      name: {
        contains: searchInput,
      },
    },
    include: {
      images: true,
    },
  });

  const results = {
    users,
    events,
    groups,
    donations,
  };

  return {
    props: {
      session,
      results: JSON.parse(JSON.stringify(results)),
    },
  };
};
export default getSearchPageProps;
