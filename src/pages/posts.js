import Post from '@/components/Post';
import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import prisma from '../../server/db/prisma';
import { useRef, useState } from 'react';

const getProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const authorId = session.user.id;
  const posts = await prisma.post.findMany({
    where: {
      author_id: authorId,
    },
  });

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

const Posts = (props) => {
  const [posts, setPosts] = useState(props.posts);

  const postText = useRef();

  //move functons to a different file later
  const handleNewPost = async () => {
    const text = postText.current.value;

    const response = await fetch('/api/prisma/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text }),
    });
    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      postText.current.value = '';
      const newPost = await response.json();
      setPosts([...posts, newPost]);
    }
  };

  const deletePost = async (postId) => {
    const response = await fetch(`/api/prisma/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      const deletedPost = await response.json();

      setPosts(
        posts.filter((post) => {
          return post.id !== deletedPost.id;
        })
      );
    }
  };

  return (
    <section className='w-screen flex flex-col items-center mt-10'>
      <h2>Post test:</h2>
      <div className='w-2/4 flex flex-col'>
        <div className='text-slate-800 bg-slate-600 p-4 rounded-lg my-6'>
          <textarea
            className='w-full h-40 rounded-lg p-2 resize-none'
            ref={postText}
          />
          <button
            className='m-auto block bg-slate-300 p-4 rounded-lg mt-2 hover:bg-slate-400'
            onClick={() => handleNewPost(postText)}
          >
            New Post
          </button>
        </div>
        <div className='flex flex-col gap-6 text-slate-800 bg-slate-600 p-4 rounded-lg'>
          {posts.map((post) => {
            return <Post key={post.id} post={post} deletePost={deletePost} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Posts;
