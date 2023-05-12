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
    where: {
      author_id: authorId,
    },
    include: {
      comments: true,
    },
  });

  const comments = await prisma.post.findMany({
    where: {
      author_id: authorId,
    },
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

const TestPosts = (props) => {
  const [posts, setPosts] = useState(props.posts);

  return <Posts posts={posts} setPosts={setPosts} authorId={props.authorId} />;
};

export default TestPosts;
