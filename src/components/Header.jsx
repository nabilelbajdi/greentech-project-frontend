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
import { CalendarIcon, GlobeIcon, UserGroupIcon } from "@heroicons/react/outline";

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
                <Image
                  src={'https://lh3.googleusercontent.com/uscPM6Vo1rHO92OB9EaGGalw769jR7i-_srqih9xd3AwKBIKQEg9Wsnw5KnKfMGFscKp1Yvx-rbwIM-x8aFKVms7kpCkh_Z-2XH2twm1FL7y22-DDSsMESVdpons94mHYQa-hapIWiff1btaR586Fn556ZZtKSmrb9813MRZNcvo0Xottn81s571URBJg24hKOooHTy5SKx8Dy-mtBbdAYvvgbTgrYg62rILNbC7_8yb40uhbEA7Irh0w0aAV2A8Py7ReYVhbE-ZpJ1mLEMpturkkkSVt3r5Hd5hPPa-u2Q5xvw0IbDmB4qaFsdEi5An93RzptO5UXkThdG79786LS7vGOn1yX-USI0RR_3pmTZujPVqa2EOlLu2uV2Groto4yIAlVYJbBJcKRO6Cn13ctgAt278eLn3by5_JY4X2r3-7H_CGMy9jkYSMBGVP_5ofV1Hvf0UexTanWA4aZIgPhCyV8LsQS9SeEPug65I1ZBveeGUjWLZYvtT2XZQaIPEWwr-ts3ab1quc8j022l7Ixcf0nFRuqO7LAcUauil-sYHIEa6K7gTunEfWtig-WP6f2jfLOEfWpX2nxTmWUKxvYKbTlcijHjr37lTUc9zqp_y-1ukxLH7zxybA3CUJCCI4NINnFOYAllpWuPzY3SKraxW0XZsIT694lHcHtSLnoN9PSCzIzsmY4xeSzXEOMZzZlkuJgZisqjO8xlWRPhAr79qf89FCT05C8dKdydMThgvSbAkQ1gFHQFH9BKvD6EloWaCxWzGy2jsXZdAuYDY_zA0mPki8niON4Fkb-MmBjoPk-jOZWheci9Wm-m15HVA2xhCMRXGhf-r-Dz00WwNL9ed895KEhgLHWRK9ZLvoxGqxh7Chdxf1s9U22_GG_cAnGJLl9K2zOHK6XE-6rdE34cmzrBfFZE2LMyMIpWkYq3PbH2tZfIWvGcKyny-C1sbn7hcb_uGxim8Zu7wvg=w238-h159-s-no?authuser=0'}
                  alt='logo'
                  width={150}
                  height={150}
                />
              </Link>
              
              <div className=' mx-auto py-5 sm:py-0 sm:mx-0'>
                <div className='flex pt-2 space-x-6 sm:space-x-2 items-center'>
                  <Messenger setDropdown={setDropdown} />
                  <Link href='/groups'>
                  <UserGroupIcon className='h-8 w-8 sm:hidden'/>
                  </Link>
                  
                  <Notifications setDropdown={setDropdown} />
                  <UserMenu size={75} />
                  <Link href='/events'>
                  <CalendarIcon  className='h-8 w-8 sm:hidden'/>
                  </Link>
                  <Link href='/donations'>
                  <GlobeIcon  className='h-8 w-8 sm:hidden'/>
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
              <SearchBar/> 
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
