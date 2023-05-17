import Post from '@/components/Post';
import { useState } from 'react';
import StatusBox from './StatusBox';


const Posts = ({ posts, setPosts, authorId, likedByUser }) => {
  const [uploadImages, setUploadImages] = useState();

  //move functons to a different file later

  return (
    <section className='w-full flex flex-col py-2'>
      
      <div className='flex flex-col m-auto w-full lg:w-[700px]'>
      
      
        {/* <StatusBox posts={posts} setPosts={setPosts} /> */}
        <div className='flex flex-col gap-6 text-slate-800 bg-green-500 p-4 rounded-md'>
          {posts.map((post) => {
            let alreadyLiked;
            post.likes.map((like) => {
              if (like.liked_by_id === authorId) {
                alreadyLiked = true;
              }
            });

            return (
              <Post
                key={post.id}
                post={post}
                posts={posts}
                setPosts={setPosts}
                authorId={authorId}
                likedByUser={alreadyLiked}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Posts;
