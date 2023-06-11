import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { UserCircleIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import Messenger from './Messenger';
import ConversationsMenu from './ConversationsMenu';
import NotificationsMenu from './NotificationsMenu';
import Notifications from './Notifications';
import Socket from './Socket';
import Link from 'next/link';
import SearchBar from './SearchBar';

const Header = () => {
  const { data: session, status } = useSession();
  const [dropdown, setDropdown] = useState('');

  let DropDownRender = undefined;

  switch (dropdown) {
    case 'conversations':
      DropDownRender = ConversationsMenu;
      break;
    case 'notifications':
      DropDownRender = NotificationsMenu;
      break;

    default:
      DropDownRender = undefined;
  }

  if (status === 'authenticated') {
    return (
      <>
        <Socket setDropdown={setDropdown} />
        <div className='sticky flex-col top-0 z-50 items-center lg:px-5 h-min-24 border-none p-5 w-full bg-gradient-to-b from-[#3A4F6F] to-chas-secondary'>
          <div>
            <div className=' flex items-top lg:w-full justify-between pr-10 mb-3'>
              <Link href='/'>
                <Image
                  src='https://cdn-icons-png.flaticon.com/512/3281/3281613.png'
                  alt='logo'
                  width={100}
                  height={100}
                />
              </Link>
              <div>
                <div className='flex pt-2 space-x-2'>
                  <Link href={`/${session.user.userPath}`} className='menuIcon'>
                    <UserCircleIcon className='headerIcon' />
                  </Link>
                  <Notifications setDropdown={setDropdown} />
                  <Messenger setDropdown={setDropdown} />
                </div>
              </div>
            </div>
          </div>
          <div className='flex w-3/4'>
            <div className='flex flex-grow'>
              <div className=' flex space-x-3 w-4/5 justify-between px-5 sm:space-x-4'>
                <Link href='/groups' className='menuIcon'>
                  Grupper
                </Link>
                <Link href='/events' className='menuIcon'>
                  Evenemang
                </Link>
                <Link href='/donations' className='menuIcon'>
                  Donationer
                </Link>
                <Link href={`/${session.user.userPath}`} className='menuIcon'>
                  Profil
                </Link>
                <Link
                  href={`/${session.user.userPath}/friends`}
                  className='menuIcon'
                >
                  Vänner
                </Link>
              </div>
            </div>

            <SearchBar />
          </div>
          {DropDownRender && <DropDownRender setDropdown={setDropdown} />}
        </div>
      </>
    );
  }
  return <a href='/api/auth/signin'>Sign in</a>; //Lägg en else for status unauthorised
};

export default Header;
