import Post from '@/components/Post';
import Image from 'next/image';
import getProps from '@/utils/getProps';
export const getServerSideProps = getProps;
import { useEffect, useRef, useState } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [uploadImage, setUploadImage] = useState();
  const postText = useRef();

  console.log('hello');

  //move functons to a different file later
  const handleNewPost = async () => {
    const images = await uploadImages();

    console.log(images);

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
      fetchPosts();
    }

    return await response.json();
  };

  const uploadImages = async () => {
    const form = new FormData();

    form.append('image', uploadImage);

    const response = await fetch('api/images', {
      method: 'POST',
      body: form,
    });

    const data = await response.json();

    return await data;
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

  useEffect(() => {
    fetchPosts();
  });

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
          <textarea
            className='w-full h-40 rounded-lg p-2 resize-none'
            ref={postText}
          />
          <input
            className='mt-2'
            type='file'
            onChange={(e) => {
              setUploadImage(e.target.files[0]);
              console.log(uploadImage);
            }}
            id='image'
            name='image'
            accept='image/png, image/jpeg, image/webp'
          />
          {uploadImage && (
            <Image
              className='mt-2'
              src={URL.createObjectURL(uploadImage)}
              alt='Image set to upload'
              width={100}
              height={100}
            />
          )}
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
