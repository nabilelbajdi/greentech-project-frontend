//un-comment code below when user-functionality is implemented and authentication is required. Basic GET, POST and DELETE methods.
//import getProps from '@/utils/getProps';
//export const getServerSideProps = getProps;
import Image from 'next/image';
import { useRef, useState } from 'react';
import prisma from '../../server/db/prisma';
import { useSession } from 'next-auth/react';

export const getStaticProps = async () => {
  const posts = await prisma.post.findMany();

  return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
};

const Posts = (props) => {
  const [posts, setPosts] = useState(props.posts);
  const [postImage, setPostImage] = useState();
  const postText = useRef();

  const { data: session } = useSession();

  //move functons to a different file later
  const handleNewPost = async () => {
    // This must be sent as FormData to handle the images.
    const form = new FormData();
    form.append('image', postImage);
    form.append('text', postText.current.value);
    form.append('userEmail', session.user.email);

    const response = await fetch('api/prisma/posts', {
      method: 'POST',
      body: form,
    });

    const data = await response.json();

    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      console.log(data);
      postText.current.value = '';
      setPostImage(null);
      fetchPosts();
    }

    return data;
  };

  const fetchPosts = async () => {
    const response = await fetch('/api/prisma/posts', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      const data = await response.json();
      setPosts(data);
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
      fetchPosts();
    }
  };

  return (
    <section className='w-screen flex flex-col items-center mt-10'>
      <h2>Post test:</h2>
      <div className='w-2/4 flex flex-col'>
        <div className='text-slate-800 bg-slate-600 p-4 rounded-lg my-6'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNewPost();
              e.target.reset();
            }}
          >
            <textarea
              className='w-full h-40 rounded-lg p-2 resize-none'
              ref={postText}
            />
            <input
              className='mt-2'
              type='file'
              onChange={(e) => {
                setPostImage(e.target.files[0]);
                console.log(postImage);
              }}
              id='image'
              name='image'
              accept='image/png, image/jpeg, image/webp'
            />
            {postImage && (
              <Image
                className='mt-2'
                src={URL.createObjectURL(postImage)}
                alt='Image set to upload'
                width={100}
                height={100}
              />
            )}
            <button
              type='submit'
              className='m-auto block bg-slate-300 p-4 rounded-lg mt-2 hover:bg-slate-400'
            >
              New Post
            </button>
          </form>
        </div>
        <ul className='flex flex-col gap-6 text-slate-800 bg-slate-600 p-4 rounded-lg'>
          {posts.map((post) => {
            return (
              <li
                key={post.id}
                className='relative bg-slate-300 p-4 rounded-lg'
              >
                <p>{post.text}</p>
                {post.image && (
                  <Image
                    className='mt-2'
                    src={post.image}
                    alt=''
                    width={400}
                    height={100}
                  />
                )}
                <button
                  className='absolute top-4 right-4'
                  onClick={() => deletePost(post.id)}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Posts;
