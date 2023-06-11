import Image from "next/image";
import { useSession } from "next-auth/react";
import { CalendarIcon, GlobeIcon, UserGroupIcon } from "@heroicons/react/outline";


import { useState } from "react";
import Messenger from "./Messenger";
import ConversationsMenu from "./ConversationsMenu";
import NotificationsMenu from "./NotificationsMenu";
import Notifications from "./Notifications";
import Socket from "./Socket";
import Link from "next/link";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";


const HeaderMobile = () => {
  const { data: session, status } = useSession();
  const [dropdown, setDropdown] = useState("");


  let DropDownRender = undefined;


  switch (dropdown) {
    case "conversations":
      DropDownRender = ConversationsMenu;
      break;
    case "notifications":
      DropDownRender = NotificationsMenu;
      break;


    default:
      DropDownRender = undefined;
  }


  if (status === "authenticated") {
    return (
      <>
        <Socket setDropdown={setDropdown} />
        <div className=' sm:hidden shadow-md rounded-xl flex-col top-0 z-50 items-center lg:px-5 h-min-24 border-none p-3 w-full bg-gradient-to-b from-[#3A4F6F] to-chas-secondary'>
          <div>
            <div className=' flex justify-between'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='mobileIcon'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='mobileIcon'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>


                {/*  här ska searchbar ligga */}
              </div>
            </div>


            <div className=' flex items-top lg:w-full justify-between my-6'>
             
              <div className="flex mx-auto justify-between pt-4">
                <div className='flex justify-between items-center space-x-6'>
                <div>
                <Link href='/donations'>
                    <GlobeIcon className="mobileIcon"/>
                </Link>
                </div>
                <div>
                <Link href="/events">
                    <CalendarIcon className="mobileIcon"/>
                </Link>
                </div>
               <div>
               <UserMenu size={75}/>
               </div>
                <div>
                <Notifications setDropdown={setDropdown} />
                </div>
                  <div>
                  <Link href={`/${session.user.userPath}/friends`}>
                  <UserGroupIcon className="mobileIcon"/>
                  </Link>
                  </div>
   
                 
                </div>
              </div>
            </div>
          </div>
       
          {DropDownRender && <DropDownRender setDropdown={setDropdown} />}
        </div>
      </>
    );
  }
  return <a href='/api/auth/signin'>Sign in</a>; //Lägg en else for status unauthorised
};


export default HeaderMobile;
