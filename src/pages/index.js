import { Inter } from 'next/font/google';
import Feed from '@/components/Feed';
import Head from "next/head";
import Sidebar from '@/components/Sidebar';
import HomeFeed from '@/components/HomeFeed';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';


const inter = Inter({ subsets: ['latin'] });
const getProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const prisma = new PrismaClient()
  const posts = await prisma.post.findMany()

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
export const getServerSideProps = getProps;

const Home = ({posts}) => {
  return (
    <div>
    <div className='h-screen bg-gray-100 overflow-hidden'>
    <Head>
    <title>TreeHouse</title>
    </Head>
    <main className='flex'>
      <Sidebar/>
      <HomeFeed posts ={posts} />
      {/* <HomeFeed posts ={posts}/> */}
      
    </main>
    </div>
    <Feed />
    </div>
  );
};


export default Home;
