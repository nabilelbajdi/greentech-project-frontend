import Post from '@/components/Post';
import Image from 'next/image';
import { useState, useRef } from 'react';

const Posts = ({ posts, setPosts, authorId }) => {
  const [uploadImages, setUploadImages] = useState();
  const postText = useRef();

  //move functons to a different file later
  const handleNewPost = async () => {
    console.log(posts);
    let images;
    if (uploadImages) {
      images = await handleUploadImages();
      console.log(images);
    }

    const text = postText.current.value;

    const response = await fetch('/api/prisma/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text, images }),
    });
    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      postText.current.value = '';
      const newPost = await response.json();

      setPosts([newPost, ...posts]);
    }
  };

  const handleUploadImages = async () => {
    const form = new FormData();

    uploadImages.forEach((image) => {
      form.append('images', image);
    });

    const response = await fetch('api/images', {
      method: 'POST',
      body: form,
    });

    return await response.json();

    //return await data;
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
    <section className='w-full flex flex-col items-center mt-6'>
      <div className='flex flex-col'>
        <div className='text-slate-800 bg-green-500 p-4 rounded-lg my-6'>
          <textarea
            className='w-full h-40 rounded-lg p-2 resize-none'
            ref={postText}
          />
          <input
            className='mt-2'
            type='file'
            multiple
            onChange={(e) => {
              setUploadImages([...e.target.files]);
            }}
            id='image'
            name='image'
            accept='image/png, image/jpeg, image/webp'
          />

          {uploadImages && (
            <div className='flex'>
              {uploadImages.map((image, idx) => {
                return (
                  <Image
                    className='mt-2'
                    key={idx}
                    /* src={URL.createObjectURL(uploadImage)} */
                    src={URL.createObjectURL(image)}
                    alt='Image set to upload'
                    width={100}
                    height={100}
                  />
                );
              })}
            </div>
          )}
          <button
            className='m-auto block bg-green-100 p-4 rounded-md mt-2 hover:bg-green-300'
            onClick={handleNewPost}
          >
            New Post
          </button>
        </div>
        <div className='w-[700px] flex flex-col gap-6 text-slate-800 bg-green-500 p-4 rounded-md'>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                post={post}
                deletePost={deletePost}
                authorId={authorId}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Posts;
