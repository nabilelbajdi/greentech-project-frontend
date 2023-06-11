import { useState } from 'react';
import Posts from '@/components/Posts';
import getHomePageProps from '@/utils/getHomePageProps';
import FriendsWidget from '@/components/Widget';
export const getServerSideProps = getHomePageProps;

const Home = (props) => {
  const [posts, setPosts] = useState(props.posts);

  return (
    <div className='w-full'>
      <main className='flex'>
        <Posts posts={posts} setPosts={setPosts} />
        <FriendsWidget />
      </main>
    </div>
  );
};

export default Home;
