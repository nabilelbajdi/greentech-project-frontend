import Image from 'next/image';
import Button from './Button';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { SocketContext } from '@/context';
import socket from "@/socket";
import sendFriendRequest from '@/functions/sendFriendRequest';
import { useEffect } from 'react';
import confirmFriendRequest from '@/functions/confirmFriendRequest';
import denyFriendRequest from '@/functions/denyFriendRequest';
import cancelFriendRequest from '@/functions/cancelFriendRequest';
import { useRouter } from 'next/router';


const ProfileCard = ({ user }) => {
  const { data: session } = useSession();
  const { openConversations } = useContext(SocketContext);
  const router = useRouter();

  const reloadPage = () => { router.reload(window.location.pathname); }

  let friendRequestButton = [];

  if (user.isFriend) {

    friendRequestButton.push(
      {
        title: 'Ta bort vän',
        callback: () => { cancelFriendRequest(user.id, reloadPage) }
      }
    )


  } else {

    if (user.hasFriendRequest) {

      friendRequestButton.push(
        {
          title: 'Bekräfta vän',
          callback: () => { confirmFriendRequest(user.id, reloadPage) }
        },
        {
          title: 'Neka vän',
          callback: () => { denyFriendRequest(user.id, reloadPage) }
        }
      )

    } else if (user.hasSentFriendRequest) {

      friendRequestButton.push(
        {
          title: 'Avbryt vänförfrågan',
          callback: () => { cancelFriendRequest(user.id, reloadPage) }
        }
      )

    } else {

      friendRequestButton.push(
        {
          title: 'Lägg till vän',
          callback: () => { sendFriendRequest(user.id, reloadPage) }
        }
      )

    }

  }

  const openConversation = async (userPath) => {

    const checkExisting = () => {

      for (let i = 0; i < openConversations.length; i++) {

        if (openConversations[i].with === userPath) {
          return true;
        }

      }

    }

    if (checkExisting()) return;

    socket.io.emit('get conversation', { userPath });

  }



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

          {friendRequestButton.map((button, index) => {
            return (
              <Button
                key={`requestButton${index}`}
                title={button.title}
                callback={button.callback} />
            )
          })}

          <Button
            title='Chatta'
            callback={() => {
              console.log(user)
              openConversation(user.userPath)
            }} />
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
