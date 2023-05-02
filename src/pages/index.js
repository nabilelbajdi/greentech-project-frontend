import { Inter } from 'next/font/google';
import Feed from '@/components/Feed';
import getProps from '@/utils/getProps';
export const getServerSideProps = getProps;

const inter = Inter({ subsets: ['latin'] });

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
