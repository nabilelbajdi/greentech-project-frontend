import { Inter } from 'next/font/google';
import Feed from '@/components/Feed';
import getProps from '@/utils/getProps';
import Header from '@/components/Header';
import Head from "next/head";
import Sidebar from '@/components/Sidebar';
export const getServerSideProps = getProps;

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  return (
   <div>
    <Head>
    <title>TreeHouse</title>
    </Head>
    <main> 
      <Header/>
      <Sidebar/>
      <Feed />
    </main>
    </div>
  );
};

export default Home;
