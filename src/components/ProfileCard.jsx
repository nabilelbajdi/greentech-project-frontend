import Image from 'next/image';
import Button from './Button';
import { useSession } from 'next-auth/react';
import { useContext, useRef, useState } from 'react';
import { SocketContext } from '@/context';
import socket from '@/socket';
import sendFriendRequest from '@/functions/sendFriendRequest';
import confirmFriendRequest from '@/functions/confirmFriendRequest';
import denyFriendRequest from '@/functions/denyFriendRequest';
import cancelFriendRequest from '@/functions/cancelFriendRequest';
import { useRouter } from 'next/router';
import deleteFriend from '@/functions/deleteFriend';
import setProfilePicture from '@/functions/setProfilePicture';


const ProfileCard = ({ user }) => {
  const { data: session } = useSession();
  const { openConversations } = useContext(SocketContext);
  const router = useRouter();
  const imageRef = useRef(null);
  const [tempImage, setTempImage] = useState();

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
    <div className='flex flex-col items-center justify-center gap-4 mt-4'>
      <Image
        src={
          tempImage
            ? URL.createObjectURL(tempImage)
            : user.profilePicture
            ? user.profilePicture
            : user.image
        }
        alt='användarens profilbild'
        height={100}
        width={100}
        className='rounded-full cursor-pointer aspect-square object-cover hover:opacity-90'
        onClick={() => imageRef.current.click()}
      />
      <input
        ref={imageRef}
        type='file'
        id='image'
        name='image'
        accept='image/png, image/jpeg, image/webp'
        onChange={(e) => {
          setProfilePicture(e.target.files[0]);
          setTempImage(e.target.files[0]);
        }}
        hidden
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

export default ProfileCard;
