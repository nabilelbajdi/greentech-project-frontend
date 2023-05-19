import { useState } from 'react';
import Posts from '@/components/Posts';
import Sidebar from '@/components/Sidebar';
import getHomePageProps from '@/utils/getHomePageProps';
export const getServerSideProps = getHomePageProps;

const Home = (props) => {
  const [posts, setPosts] = useState(props.posts);

  return (
    <div className='w-full'>
      <main className='flex'>
        <Sidebar />
        <Posts posts={posts} setPosts={setPosts} />
      </main>
    </div>
  );
};

export default Home;
