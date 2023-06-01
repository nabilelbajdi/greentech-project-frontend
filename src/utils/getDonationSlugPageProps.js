import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '../../server/db/prisma';

// All props to the event pages goes here

const getDonationSlugPageProps = async (context) => {
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

  const donation = await prisma.donation.findUnique({
    where: { id: slug },
    include: {
      user: { select: { firstName: true, lastName: true, image: true } },
      images: true,
    },
  });

  return {
    props: {
      session,
      donation: JSON.parse(JSON.stringify(donation)),
    },
  };
};
export default getDonationSlugPageProps;
