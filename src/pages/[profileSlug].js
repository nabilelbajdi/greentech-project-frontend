import Posts from '@/components/Posts';
import ProfileCard from '@/components/ProfileCard';
import { useState } from 'react';
import getProfilePageProps from '@/utils/getProfilePageProps';
export const getServerSideProps = getProfilePageProps;

const ProfilePage = (props) => {
  const [posts, setPosts] = useState(props.user.posts);
  console.log(props);

  return (
    <div className='w-full'>
      <main className='flex flex-col'>
        {props.user ? (
          <div className='flex px-10'>
            <div>
              <ProfileCard user={props.user} />
              <Posts posts={posts} setPosts={setPosts} />
            </div>
          </div>
        ) : (
          <h1>Användaren hittades inte</h1>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
