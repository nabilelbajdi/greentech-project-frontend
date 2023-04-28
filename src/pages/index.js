import { Inter } from 'next/font/google';

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
      <h1>Treehouse</h1>
    </main>
  );
};

export default Home;
