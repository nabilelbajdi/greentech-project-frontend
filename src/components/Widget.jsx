import { SocketContext } from '@/context';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import FriendWidget from './FriendWidget';

const Widget = () => {
  const { data: session } = useSession();
  const { chosenFriends } = useContext(SocketContext);
  const [chosen, setChosen] = useState([])

  let pic;

  if (session.user.profilePicture) {

    pic = session.user.profilePicture

  } else {

    pic = session.user.image;

  }

  let renderFriends = false;

  if (chosenFriends.length > 0) renderFriends = true;


  return (
    <div className=' hidden sticky top-[220px] lg:flex flex-col p-2 mr-12 ml-5 mt-5 '>
      <div className='py-8 rounded-2xl bg-gray-400/20 border border-gray-400/80 shadow shadow-gray-800/10 p-1  '>
        <div className='mb-5'>
          <Image
            width={80}
            height={80}
            alt='profilbild'
            className='aspect-square object-cover rounded-full cursor-pointer  min-w-[50px] min-h-[50px] outline outline-4 outline-white m-auto'
            src={pic}
          />
        </div>
        <ul className='flex flex-col gap-2 w-full px-2'>

          {renderFriends && chosenFriends.map((user, index) => (

            <FriendWidget
              key={`friend#${index}`}
              user={user}
              ownProfile={true} />

          ))}
          {!renderFriends && <li key='noFriendsKey' className='w-[234px] text-center font-semibold'>Du har inga vänner att visa än</li>}
        </ul>

      </div>
    </div>
  );
};

export default Widget;
