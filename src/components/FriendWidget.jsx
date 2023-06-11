import Image from 'next/image';
import Link from 'next/link';
import DotDotDotMeny from './DotDotDotMeny';
import { useContext, useState, useRef } from 'react';
import { SocketContext } from '@/context';
import deleteFriend from '@/functions/deleteFriend';
import openConversation from '@/functions/openConversation';
import { AiOutlineEllipsis } from 'react-icons/ai'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const FriendWidget = ({ user, ownProfile }) => {

  const { openConversations } = useContext(SocketContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const reloadPage = () => {
    router.reload(window.location.pathname);
  };

  let pic;

  if (user.profilePicture) {

    pic = user.profilePicture

  } else {

    pic = user.image;

  }


  let online = false;
  const name = `${user.firstName} ${user.lastName}`;

  if (user.socketId) {

    online = true;

  }

  const dotDotDot = [
    {
      title: 'Besök profil',
      link: `/${user.userPath}`,
    },
    {
      title: 'Chatta',
      callback: () => { openConversation(user.userPath, openConversations) },
    },
  ];

  if (ownProfile) {

    dotDotDot.push({
      title: 'Ta bort vän',
      callback: () => { deleteFriend(user.id, reloadPage) }
    })

  }

  return (
    <div className='flex items-center justify-between w-full'>
      <div
        className=' flex items-center space-x-2 relative p-2 rounded-xl cursor-pointer w-full font-semibold'
      >
        <Link href={`/${user.userPath}`}>
          <Image
            className='aspect-square rounded-full object-cover max-w-[50px] max-h-[50px]'
            src={pic}
            alt={`${name}s profilbild`}
            width={50}
            height={50}
          />
        </Link>
        <Link className='w-full' href={`/${user.userPath}`}><p className='w-[136px] text-ellipsis overflow-hidden whitespace-nowrap h-5'>{name}</p></Link>
        {online && <div className='absolute bottom-2 left-8 bg-green-400 h-3 w-3 rounded-full'></div>}
      </div>
      <div className='flex items-center relative '>
        <button onClick={() => {

          setMenuVisible((value) => !value)

        }}>
          <AiOutlineEllipsis className='hover:text-slate-900 text-2xl text-slate-600' />
        </button>
        {menuVisible && <DotDotDotMeny menuContent={dotDotDot} setMenuVisible={() => setMenuVisible(false)} />}
      </div>

    </div>
  );
};

export default FriendWidget;
