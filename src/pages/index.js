import { Inter } from 'next/font/google';
import Feed from '@/components/Feed';

import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import prisma from '../../server/db/prisma';
import { useState } from 'react';
import Posts from '@/components/Posts';

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

  const authorId = session.user.id;
  const posts = await prisma.post.findMany({
    orderBy: {
      created: 'desc',
    },
    include: {
      comments: true,
      author: { select: { name: true, image: true } },
    },
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

const inter = Inter({ subsets: ['latin'] });

const Home = (props) => {
  const [posts, setPosts] = useState(props.posts);
  console.log(posts);

  return (
    <div className='w-full'>
      <main>
        <Posts posts={posts} setPosts={setPosts} authorId={props.authorId} />
        {/* <Feed /> */}
      </main>
    </div>
  );
};

export default Home;
