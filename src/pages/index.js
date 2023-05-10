import { Inter } from 'next/font/google';
import Feed from '@/components/Feed';

import Head from "next/head";
import Sidebar from '@/components/Sidebar';
import HomeFeed from '@/components/HomeFeed';
import { PrismaClient } from '@prisma/client';



const inter = Inter({ subsets: ['latin'] });

const Home = ({posts}) => {
  return (
    <div>
    <div className='h-screen bg-gray-100 overflow-hidden'>
    <Head>
    <title>TreeHouse</title>
    </Head>
    <main className='flex'>
      <Sidebar/>
      <HomeFeed/>
      {/* <HomeFeed posts ={posts}/> */}
      
    </main>
    </div>
    <Feed />
    </div>
  );
};
export async function getStaticProps() {
  const prisma = new PrismaClient()
  const posts = await prisma.post.findMany()

  return {
    props : {posts: JSON.parse(JSON.stringify(posts))}
  }
}

export default Home;
