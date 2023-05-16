import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';

import { GlobeIcon, SearchIcon, CalendarIcon } from '@heroicons/react/outline';

import HeaderIcon from './HeaderIcon';
import BackendCall from './BackendCall';

const Header = () => {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return (
      <div className=' sticky flex top-0 z-50 bg-white items-center p-2 lg:px-5 shadow-md '>
        {/*Left Header */}
        <div className=' flex items-center'>
          <Image
            src='https://cdn-icons-png.flaticon.com/512/3281/3281613.png'
            alt='logo'
            width={40}
            height={40}
          />

          <div className=' flex ml-2 items-center bg-gray-200 p-2 rounded-full'>
            <SearchIcon className=' h-6 text-gray-600' />
            <input
              className=' hidden lg:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink'
              type='text'
              placeholder='Search Something'
            />
          </div>
        </div>
        {/*Center Header*/}
        <div className='flex justify-center flex-grow'>
          <div className=' flex space-x-3 w-4/5 justify-around sm:space-x-4'>
            <HeaderIcon active Icon={HomeIcon} />
            <HeaderIcon Icon={CalendarIcon} />
            <HeaderIcon Icon={GlobeIcon} />
            <HeaderIcon Icon={UserGroupIcon} />
            <BackendCall />
          </div>
        </div>
        {/*Right Header */}
        <div className=' flex items-center justify-end sm:space-x-2'>
          {/*Profile pic */}
          <Image
            onClick={signOut}
            width={40}
            height={40}
            className=' rounded-full cursor-pointer'
            src={session.user.image}
            alt='user profile picture'
          />
          <p className=' whitespace-nowrap font-semibold pr-3 hidden xl:inline-flex text-sm'>
            {session.user.name}
          </p>{' '}
          {/*fetch name from db */}
          <ViewGridIcon className='icon' />
          <ChatIcon className='icon' />
          <BellIcon className='icon' />
          <ChevronDownIcon className='icon' />
        </div>
      </div>
    );
  };
  return <a href="/api/auth/signin">Sign in</a>//Lägg en else for status unauthorised
}

export default Header;
