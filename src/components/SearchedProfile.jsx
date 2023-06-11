import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { useContext, useState } from 'react';
import { SocketContext } from '@/context';
import socket from '@/socket';
import sendFriendRequest from '@/functions/sendFriendRequest';
import confirmFriendRequest from '@/functions/confirmFriendRequest';
import denyFriendRequest from '@/functions/denyFriendRequest';
import cancelFriendRequest from '@/functions/cancelFriendRequest';
import { useRouter } from 'next/router';
import deleteFriend from '@/functions/deleteFriend';
import { useSession } from 'next-auth/react';
import ProfileModalPreview from './ProfileModalPreview';

const SearchedProfile = ({ user, setInput, title }) => {
  const { data: session } = useSession();
  // const { openConversations } = useContext(SocketContext);
  // const router = useRouter();

  const path = {
    Evenemang: 'events',
    Grupper: 'groups',
    Donationer: 'donations',
  };

  let temporaryImage;
  if (path[title]) {
    temporaryImage = path[title].split('s')[0];
  }

  // const reloadPage = () => {
  //   router.reload(window.location.pathname);
  // };

  // let friendRequestButton = [];

  // if (user.isFriend) {
  //   friendRequestButton.push({
  //     title: 'Ta bort vän',
  //     callback: () => {
  //       deleteFriend(user.id, reloadPage);
  //     },
  //   });
  // } else {
  //   if (user.hasFriendRequest) {
  //     friendRequestButton.push(
  //       {
  //         title: 'Bekräfta vän',
  //         callback: () => {
  //           confirmFriendRequest(user.id, reloadPage);
  //         },
  //       },
  //       {
  //         title: 'Neka vän',
  //         callback: () => {
  //           denyFriendRequest(user.id, reloadPage);
  //         },
  //       }
  //     );
  //   } else if (user.hasSentFriendRequest) {
  //     friendRequestButton.push({
  //       title: 'Avbryt vänförfrågan',
  //       callback: () => {
  //         cancelFriendRequest(user.id, reloadPage);
  //       },
  //     });
  //   } else {
  //     friendRequestButton.push({
  //       title: 'Lägg till vän',
  //       callback: () => {
  //         sendFriendRequest(user.id, reloadPage);
  //       },
  //     });
  //   }
  // }

  // const openConversation = async (userPath) => {
  //   const checkExisting = () => {
  //     for (let i = 0; i < openConversations.length; i++) {
  //       if (openConversations[i].with === userPath) {
  //         return true;
  //       }
  //     }
  //   };

  //   if (checkExisting()) return;

  //   socket.io.emit('get conversation', { userPath });
  // };

  const [preview, setPreview] = useState(false);

  // const openModalPreview = (e) => {
  //   setPreview(true);
  //   e.stopPropagation();
  // };

  return (
    <>
      <Link
        href={`/${user.userPath}`}
        key={user.userPath}
        className='flex items-center justify-between gap-3 hover:bg-gray-100 p-2'
        onClick={() => setInput && setInput('')}
      >
        <div className='flex items-center gap-4'>
          <Image
            src={user.image}
            alt='profilbild'
            height={setInput ? 30 : 65}
            width={setInput ? 30 : 65}
            className='rounded-full'
          />
          <div>
            <p>{user.firstName + ' ' + user.lastName}</p>
            {user.city && <p>Bor i: {user.city}</p>}
            {setInput && user.isFriend && <p className='text-sm'>Vän</p>}
          </div>
        </div>
        {/* {user.id !== session.user.id && !setInput && (
          <div className='flex gap-8'>
            {friendRequestButton.map((button, index) => {
              console.log(index);
              return (
                <Button
                  key={`requestButton${index}`}
                  title={button.title}
                  callback={button.callback}
                />
              );
            })}
          </div>
        )} */}
      </Link>
      {!setInput && preview && (
        <ProfileModalPreview user={user} setPreview={setPreview} />
      )}
    </>
  );
};

export default SearchedProfile;
