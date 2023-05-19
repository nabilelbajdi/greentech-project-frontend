import { useSession } from 'next-auth/react';
import SidebarRow from './SidebarRow';
import { ChevronDownIcon, UserGroupIcon } from '@heroicons/react/outline';
import { CalendarIcon, ClockIcon, UsersIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import EventCreator from './EventCreator';

const Sidebar = () => {
  const { data: session, status } = useSession();
  const [newEvent, setNewEvent] = useState(false);

  if (status === 'authenticated') {
    return (
      <>
        <div className=' p-2 mt-5 max-w-[600px] xl:min-w-[300px]'>
          <SidebarRow src={session.user.image} title={session.user.name} />
          <SidebarRow Icon={UsersIcon} title='Friends' />
          <SidebarRow Icon={UserGroupIcon} title='Groups' />
          <SidebarRow Icon={CalendarIcon} title='Events' />
          <button
            className='pl-12 py-4 text-left font-medium hover:bg-gray-200 rounded-xl w-full'
            onClick={() => setNewEvent(!newEvent)}
          >
            Nytt event
          </button>
          <SidebarRow Icon={ClockIcon} title='Memories' />
          <SidebarRow Icon={ChevronDownIcon} title='See More' />
        </div>
        {newEvent && (
          <EventCreator newEvent={newEvent} setNewEvent={setNewEvent} />
        )}
      </>
    );
  }
  return <a href='/api/auth/signin'>Loading...</a>; //Lägg en else for status unauthorised
};

export default Sidebar;
