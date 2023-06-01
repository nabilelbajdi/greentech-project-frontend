import Image from 'next/image';
import { useSession } from 'next-auth/react';
import {
  SearchIcon,
  UserCircleIcon,
  BellIcon,
  ChatAlt2Icon,
} from '@heroicons/react/outline';
import { MenuIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const Header = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <div className='sticky flex-col top-0 z-50 items-center lg:px-5 h-min-24 shadow-sm p-5 w-full bg-gradient-to-b from-[#3A4F6F] to-chas-secondary'>
        <div>
          <div className=' flex items-top lg:w-full justify-between pr-10 mb-3'>
            <Image
              src='https://cdn-icons-png.flaticon.com/512/3281/3281613.png'
              alt='logo'
              width={100}
              height={100}
            />
            <div>
              <div className='flex pt-2 space-x-2'>
                <UserCircleIcon className='headerIcon' />
                <BellIcon className='headerIcon' />
                <ChatAlt2Icon className='headerIcon' />
              </div>
            </div>
          </div>
        </div>
        <div className='flex'>
          <div className='flex flex-grow'>
            <div className=' flex space-x-3 w-4/5 justify-between px-5 sm:space-x-4'>
              <p className='menuIcon'>Grupper</p>
              <Link href='/events' className='menuIcon'>
                Evenemang
              </Link>
              <Link href='/donations' className='menuIcon'>
                Donationer
              </Link>
              <p className='menuIcon'>Profil</p>
              <p className='menuIcon'>Vänner </p>
            </div>
          </div>

          <div className=' flex ml-2 items-center bg-white p-2 rounded-md outline-black outline outline-1 lg:w-1/4 lg:mr-10'>
            <label className=' flex'>
              <SearchIcon className=' hidden sm:inline-flex h-6 text-gray-400' />
              <MenuIcon className=' sm:hidden h-6 text-gray-600' />
              <input
                className=' hidden lg:inline-flex ml-2 items-center outline-none placeholder-gray-400 flex-shrink '
                type='text'
                placeholder='Sök'
              />
            </label>
          </div>
        </div>
      </div>
    );
  }
  return <a href='/api/auth/signin'>Sign in</a>; //Lägg en else for status unauthorised
};

export default Header;
