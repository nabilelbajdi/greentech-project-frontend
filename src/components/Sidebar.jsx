import { useSession } from 'next-auth/react';
import SidebarRow from './SidebarRow';
import { ChevronDownIcon, UserGroupIcon } from '@heroicons/react/outline';

import { CalendarIcon, ClockIcon, UsersIcon } from '@heroicons/react/solid';

const Sidebar = () => {
  const { data: session } = useSession();
  return (
    <div className=' p-2 mt-5 max-w-[600px] xl:min-w-[300px] fixed left-0'>
      <SidebarRow src={session.user.image} title={session.user.name} />
      <SidebarRow Icon={UsersIcon} title='Friends' />
      <SidebarRow Icon={UserGroupIcon} title='Groups' />
      <SidebarRow Icon={CalendarIcon} title='Events' />
      <SidebarRow Icon={ClockIcon} title='Memories' />
      <SidebarRow Icon={ChevronDownIcon} title='See More' />
    </div>
  );
};

export default Sidebar;
