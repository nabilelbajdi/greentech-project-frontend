import Image from 'next/image';
import Button from './Button';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { SocketContext } from '@/context';
import socket from '@/socket';
import sendFriendRequest from '@/functions/sendFriendRequest';

const ProfileCard = ({ user }) => {
  const { data: session } = useSession();
  const { openConversations } = useContext(SocketContext);

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
    <div className='flex flex-col items-center justify-center gap-4 mt-4'>
      <Image
        src={user.image}
        alt='användarens profilbild'
        height={100}
        width={100}
        className='rounded-full'
      />
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      {user.id !== session.user.id && (
        <div className='flex gap-8'>
          <Button
            title='Lägg till vän'
            callback={() => sendFriendRequest(user.id)}
          />
          <Button
            title='Chatta'
            callback={() => {
              console.log(user);
              openConversation(user.userPath);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
