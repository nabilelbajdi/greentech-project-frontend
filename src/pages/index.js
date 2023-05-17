import { Inter } from 'next/font/google';
import Feed from '@/components/Feed';
import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import prisma from '../../server/db/prisma';
import { useState } from 'react';
import Posts from '@/components/Posts';
import Sidebar from '@/components/Sidebar';
import Map from '@/components/Map';
import FriendsWidget from '@/components/FriendsWidget';
import NewsSlider from '@/components/NewsSlider';
import ProfileCard from '@/components/ProfileCard';

const getProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  if (!session.user.fullyRegistered) {

    return {
      redirect: {
        destination: '/register',
        permanent: false,
      },
    };

  }

  const authorId = session.user.id;
  const posts = await prisma.post.findMany({
    orderBy: {
      created: 'desc',
    },
    include: {
      comments: true,
      author: { select: { name: true, image: true } },
      likes: true,
      images: true,
    },
  });

  const likedByUser = await prisma.like.findMany({
    where: { liked_by_id: authorId },
  });

  const comments = await prisma.post.findMany({
    include: {
      comments: true,
    },
  });

  return {
    props: {
      session,
      posts: JSON.parse(JSON.stringify(posts)),
      comments: JSON.parse(JSON.stringify(comments)),
      authorId: JSON.parse(JSON.stringify(authorId)),
    },
  };
};
export const getServerSideProps = getProps;

const Home = (props) => {
  const [posts, setPosts] = useState(props.posts);

  return (
    <div className='w-full'>
      <main className='flex p-3 space-x-4 mt-5' >
      <Sidebar />
      <div className='w-full m-auto'>
      <FriendsWidget/>
      <NewsSlider/>
      <Posts posts={posts} setPosts={setPosts} authorId={props.authorId} />
      </div>
      <ProfileCard/>
      
        
        

        {/* <Feed /> */}
      </main>
    </div>
  );
};

export default Home;
