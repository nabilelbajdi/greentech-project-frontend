import Posts from '@/components/Posts';
import ProfileCard from '@/components/ProfileCard';
import { useState } from 'react';
import getProfilePageProps from '@/utils/getProfilePageProps';
export const getServerSideProps = getProfilePageProps;
import Gallery from '@/components/Gallery';
import Link from 'next/link';

const ProfilePage = (props) => {
  const [posts, setPosts] = useState(props.user.posts);

  return (
    <div className='w-full'>
      <main className='flex flex-col'>
        {props.user ? (
          <div className='flex mx-auto w-full md:w-auto'>
            <div className='w-full md:w-auto'>
              <ProfileCard user={props.user} />

              <div className='mx-3 md:mx-auto mt-8 block  md:w-[700px] lg:hidden bg-white rounded-2xl'>
                <div className='flex py-2 px-6 justify-between items-center'>
                  <div>
                    <h2 className='font-semibold'>Bilder</h2>
                    <h3 className='text-xs'>
                      {props.user.images.length} bilder
                    </h3>
                  </div>
                  <Link
                    href={`${props.user.userPath}/gallery`}
                    className='text-blue-600'
                  >
                    Se alla
                  </Link>
                </div>
                <div className='hidden min-[500px]:block'>
                  <Gallery images={props.user.images} width={5} height={2} />
                </div>
                <div className='block min-[500px]:hidden'>
                  <Gallery images={props.user.images} width={3} height={2} />
                </div>
              </div>
              <Posts posts={posts} setPosts={setPosts} />
            </div>
            <div className='mt-[188px] mr-3  hidden lg:block max-w-sm bg-white rounded-2xl self-start'>
              <div className='flex py-2 px-6 justify-between items-center'>
                <div>
                  <h2 className='font-semibold'>Bilder</h2>
                  <h3 className='text-xs'>{props.user.images.length} bilder</h3>
                </div>
                <Link
                  href={`${props.user.userPath}/gallery`}
                  className='text-blue-600'
                >
                  Se alla
                </Link>
              </div>
              <Gallery images={props.user.images} width={3} height={4} />
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
