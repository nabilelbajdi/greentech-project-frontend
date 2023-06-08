import Post from '@/components/Post';
import { useState } from 'react';
import StatusBox from './StatusBox';

const Posts = ({ posts, setPosts, eventId }) => {
  const [uploadImages, setUploadImages] = useState();

  //move functons to a different file later

  return (
    <section className='w-full flex flex-col py-2 p-3'>
      <div className='flex flex-col  m-auto w-full h-full  md:w-[700px] space-y-5'>
        <StatusBox posts={posts} setPosts={setPosts} eventId={eventId} />
        <div className='flex flex-col gap-6 text-slate-800  rounded-md'>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                post={post}
                posts={posts}
                setPosts={setPosts}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Posts;
