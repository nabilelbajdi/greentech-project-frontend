import { useSession } from 'next-auth/react';
import SidebarRow from './SidebarRow';

import { ChevronDownIcon, UserGroupIcon, GlobeIcon } from '@heroicons/react/outline';

import { CalendarIcon, ClockIcon, UsersIcon } from '@heroicons/react/solid';

const Sidebar = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <div className=' hidden sm:inline-block p-2 max-w-[600px] xl:min-w-[300px] mt-72 '>
        <div className='outline outline-1 rounded-md'>
        <p className=' hidden sm:inline-flex p-2 text-xl font-semibold'>Kategorier</p>
        
        <SidebarRow Icon={GlobeIcon} title='Donationer' />
        <SidebarRow Icon={UserGroupIcon} title='Groups' />
        <SidebarRow Icon={CalendarIcon} title='Events' />
        
        </div>
        
        
      </div>
    );
  }
  return <a href='/api/auth/signin'>Loading...</a>; //Lägg en else for status unauthorised
};

export default Sidebar;
