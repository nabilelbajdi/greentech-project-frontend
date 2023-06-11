import Friend from '@/components/Friend';
import getProfilePageProps from '@/utils/getProfilePageProps';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
export const getServerSideProps = getProfilePageProps;

const FriendsPage = (props) => {
  const { data: session, status } = useSession();
  let ownProfile = false;
  let name = `${props.user.firstName} ${props.user.lastName}s`;
  if ((props.user.userPath === session.user.userPath)) {
    ownProfile = true;
    name = 'Mina';
  }

  return (
    <div className='w-full'>
      <main className='flex flex-col'>
        {props.user ? (
          <div className='mt-8 mx-10'>
            <div className='flex justify-between border-b border-gray-300 py-2 mb-4 '>
              <h2 className='text-lg'>{name} vänner</h2>
              {ownProfile && <Link href='/myfriendrequests' className='text-blue-600' >Visa vänförfrågningar</Link>}
            </div>

            <div className='grid md:grid-cols-2 gap-x-8 gap-y-4'>

              {props.user.friends.map((user, index) => {

                return (
                  <Friend
                    key={`friend#${index}`}
                    src={user.image}
                    name={`${user.firstName} ${user.lastName}`}

                    userPath={user.userPath}
                    ownProfile={ownProfile}
                    user={user}
                  />
                )

              })}

            </div>
          </div>

        ) : (
          <h1>Användaren hittades inte</h1>
        )}
      </main>
    </div>
  );
};

export default FriendsPage;
