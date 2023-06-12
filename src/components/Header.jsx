import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Messenger from './Messenger';
import ConversationsMenu from './ConversationsMenu';
import NotificationsMenu from './NotificationsMenu';
import Notifications from './Notifications';
import Socket from './Socket';
import Link from 'next/link';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';
import {
  CalendarIcon,
  GlobeIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';

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
        <div className='sm:sticky shadow-md rounded-b-xl sm:shadow-none sm:rounded-none flex-col top-0 z-50 items-center lg:px-5 h-min-24 border-none p-5 w-full bg-gradient-to-b from-[#3A4F6F] to-chas-secondary'>
          <div>
            <div className=' flex items-top lg:w-full justify-between sm:pr-10 sm:mb-3'>
              <Link href='/' className='hidden sm:inline-flex'>
                <Image src={'/logo.png'} alt='logo' width={150} height={150} />
              </Link>

              <div className=' mx-auto py-5 sm:py-0 sm:mx-0'>
                <div className='flex pt-2 space-x-6 sm:space-x-2 items-center'>
                  <Messenger setDropdown={setDropdown} />
                  <Link href='/groups'>
                    <UserGroupIcon className='h-8 w-8 sm:hidden' />
                  </Link>

                  <Notifications setDropdown={setDropdown} />
                  <UserMenu size={75} />
                  <Link href='/events'>
                    <CalendarIcon className='h-8 w-8 sm:hidden' />
                  </Link>
                  <Link href='/donations'>
                    <GlobeIcon className='h-8 w-8 sm:hidden' />
                  </Link>
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
            <div className='pt-2'>
              <SearchBar />
            </div>
          </div>
          {DropDownRender && <DropDownRender setDropdown={setDropdown} />}
        </div>
      </>
    );
  }
  return <a href='/api/auth/signin'>Sign in</a>; //Lägg en else for status unauthorised
};

export default Header;
