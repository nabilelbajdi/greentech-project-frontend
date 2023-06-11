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
import UserMenu from './UserMenu';


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
        <div className='hidden sm:inline-flex sticky flex-col top-0 z-50 items-center lg:px-5 h-min-24 border-none p-5 w-full bg-gradient-to-b from-[#3A4F6F] to-chas-secondary'>
          <div className=' flex justify-between w-full'>
            <div className=' flex items-top w-full  justify-between pr-10 mb-3'>
              <Link href='/'>
                <Image
                  src='https://lh3.googleusercontent.com/fv4p_6DAxkMRSnB78n0kuMB_92DwDuApEyD5ywChYSqRMgg7rUsPm4a2I5pPC5Y0MbDHCrSnN1S5yQOXoNWJuKdh34tPq0W4HTauBzhGz9JykhJilQXeFhlu537Dakus_4RIhqRzqZfcnrswQ6ZpMbOTMnFh7duEFGBbRgok7PJ4KOH1jDa_U3NjM2fzDyDUUNoKZxJq3H8JOeXs6dQOiFxmIKAsSbCB2MzASjuaEp1WTLbFzJEEknWRzz-hRNm1ViqoLStGnsx_eQud7-9CMSKzBOlYgYYc0U9GZjg4gNEj-KjOtqrnM6q_Jkg_AVjBY24LScRxguNjP95PPUavFFxjpuVwOtG0w-jzFm7NLDkRRptVIeDBtFO9zrmaZBR-dn0wR9BMFzzKj9nvXT-2dFKQFJXuUNZgDWxnNx6wl8MUWE76jf98Wp-P1Agweq84HHtLri5li8uKYWIf0fkHQCxUDDauDqcSC2eJkqcLev1OksjpyIFQ2CDcRNkBgraN1GbiEcL-dc_6QoGro6psdHV_tobCX1Kjwq_LUNoiSxSaNcAiU_m-07PLpkCToWrwtfWFd4YEYz9JEiG26af3PsOsJPt-S7ztRybCaEzrpKeefdyY27y9jLYDLzDr1eeAXEMDSwKz72CodNtJEwAt1kMZ16z-6Unzmq31pgz9dFeH5rJ0Xc0pv_F-rHeP1TuWjG0ETT7yAz-E3QC-EYdzHX1DVNeT8UCqgiiwLCJytLaFC_BGGbfcX7GbadEy4bilh4lBJzagj_foncuyE85HrBDfi7mt9FS3ozlBtJnMSFLFh0uPEXZ6UeNbgMXbnezZc_FyPK9tbN4XKNCzifHm5xrxYsQdKme45xmUgREj91fXYFQoAFxXg14EEnKkjFbi8DIfxYhQRxy2t6xM1FeCbg7Tj9-0uvtFWM0JHevs_UeYzNDIceWNvfTWRk29YhLH7IE4XzXLCWEDNoKMG1sr7gsWLIQz6OjglcJOX5BA_qDKmipjerIwww=w238-h159-s-no?authuser=0'
                  alt='logo'
                  width={150}
                  height={150}
                />
              </Link>
              <div>
                <div className='flex pt-2 items-center space-x-2'>
                  <Notifications setDropdown={setDropdown}  />
                  <Messenger setDropdown={setDropdown} />
                  <UserMenu/>
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
