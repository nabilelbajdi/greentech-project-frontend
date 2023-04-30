import { Inter } from 'next/font/google';
import Feed from '@/components/Feed';
import getProps from '@/utils/getProps';
export const getServerSideProps = getProps;


const inter = Inter({ subsets: ['latin'] });

// import prisma from '../../server/db/prisma';

// export async function getServerSideProps() {
//   const users = await prisma.user.findMany({
//     select: {
//       id: true,
//       username: true,
//     },
//   });

//   return {
//     props: { users: JSON.parse(JSON.stringify(users)) },
//   };
// }



const Home = () => {

  return (

    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Feed />
    </main>

  );
};

export default Home;



