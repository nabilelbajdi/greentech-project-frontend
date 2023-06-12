import Image from 'next/image';
import { useContext } from 'react';
import { SocketContext } from '@/context';
import socket from '@/socket';
import sendFriendRequest from '@/functions/sendFriendRequest';
import confirmFriendRequest from '@/functions/confirmFriendRequest';
import denyFriendRequest from '@/functions/denyFriendRequest';
import cancelFriendRequest from '@/functions/cancelFriendRequest';
import { useRouter } from 'next/router';
import deleteFriend from '@/functions/deleteFriend';
import { useSession } from 'next-auth/react';
import Button from './Button';
import Link from 'next/link';

const ProfileModalPreview = ({ user, setPreview }) => {
  const { data: session } = useSession();
  const { openConversations } = useContext(SocketContext);
  const router = useRouter();

  const reloadPage = () => {
    router.reload(window.location.pathname);
  };

  let friendRequestButton = [];

  if (user.isFriend) {
    friendRequestButton.push({
      title: 'Ta bort vän',
      callback: () => {
        deleteFriend(user.id, reloadPage);
      },
    });
  } else {
    if (user.hasFriendRequest) {
      friendRequestButton.push(
        {
          title: 'Bekräfta vän',
          callback: () => {
            confirmFriendRequest(user.id, reloadPage);
          },
        },
        {
          title: 'Neka vän',
          callback: () => {
            denyFriendRequest(user.id, reloadPage);
          },
        }
      );
    } else if (user.hasSentFriendRequest) {
      friendRequestButton.push({
        title: 'Avbryt vänförfrågan',
        callback: () => {
          cancelFriendRequest(user.id, reloadPage);
        },
      });
    } else {
      friendRequestButton.push({
        title: 'Lägg till vän',
        callback: () => {
          sendFriendRequest(user.id, reloadPage);
        },
      });
    }
  }

  const openConversation = async (userPath) => {
    const checkExisting = () => {
      for (let i = 0; i < openConversations.length; i++) {
        if (openConversations[i].with === userPath) {
          return true;
        }
      }
    };

    if (checkExisting()) return;

    socket.io.emit('get conversation', { userPath });
  };

  return (
    <div
      className='absolute md:flex hidden flex-col items-center justify-between p-4 bg-white border-2 shadow-lg rounded-xl w-96 h-60 '
      onMouseLeave={() => setPreview(false)}
    >
      <Link href={`/${user.userPath}`} className='flex items-center gap-4'>
        <Image
          src={user.image}
          alt='profilbild'
          height={100}
          width={100}
          className='rounded-full'
        />
        <div>
          <p>{user.firstName + ' ' + user.lastName}</p>
          {user.city && <p>Bor i: {user.city}</p>}
          {user.isFriend && <p className='text-sm'>Vän</p>}
        </div>
      </Link>

      {user.id !== session.user.id && (
        <div className='flex gap-8'>
          {friendRequestButton.map((button, index) => {

            return (
              <Button
                key={`requestButton${index}`}
                title={button.title}
                callback={button.callback}
              />
            );
          })}
          <Button
            title='Chatta'
            callback={() => {

              openConversation(user.userPath);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileModalPreview;
