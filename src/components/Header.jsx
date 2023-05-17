import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import {SearchIcon } from '@heroicons/react/outline';
import{MenuIcon} from '@heroicons/react/solid'



const Header = () => {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
  return (
    <div className=' sticky flex top-0 z-50 bg-white items-center p-4 lg:px-5 shadow-md h-24 w-full'>
      {/*Left Header */}
      <div className=' flex items-center lg:w-1/6'>
        <Image
          src='https://cdn-icons-png.flaticon.com/512/3281/3281613.png'
          alt='logo'
          width={40}
          height={40}
        />

        
      </div>
      {/*Center Header*/}
      <div className='flex justify-start flex-grow'>
        <div className=' flex space-x-3 w-4/5 justify-evenly sm:space-x-4'>
        <p className='icon'>Grupper</p>
        <p className='icon'>Evenemang</p>
        <p className='icon'>Donationer</p>
        <p className='icon'>Profil</p>
        </div>
      </div>
      {/*Right Header */}
      
      <div className=' flex ml-2 items-center p-2 rounded-md outline-black outline outline-1 lg:w-1/4 lg:mr-10'>
          <label className=' flex'>
          <SearchIcon className=' hidden sm:inline-flex h-6 text-gray-600' />
          <MenuIcon className=' sm:hidden h-6 text-gray-600' />
          <input
            className=' hidden lg:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink '
            type='text'
            placeholder='Sök'
          />
          </label>
        </div>
    </div>
  );
};
return <a href="/api/auth/signin">Sign in</a>//Lägg en else for status unauthorised
}

export default Header;
