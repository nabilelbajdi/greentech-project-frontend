import DonationOrganizationItem from './DonationOrganizationItem';
import Link from 'next/link';
import Image from 'next/image';

const DonationOrganization = ({ logoLink, logoImg, props }) => {
  return (
    <div className='lg:h-40 h-fit flex lg:flex-row flex-col'>
      <Link
        href={logoLink}
        target='_blank'
        className='flex items-center justify-center'
      >
        <Image
          src={logoImg}
          alt='organisationslogga'
          height={60}
          width={60}
          className='border-2 bg-white h-full w-60 p-4'
        />
      </Link>
      <div className='flex lg:flex-row flex-col justify-center px-2 gap-4 overflow-x-scroll h-full w-full'>
        <DonationOrganizationItem
          img={props.img1}
          title={props.title1}
          link={props.link1}
        />
        <DonationOrganizationItem
          img={props.img2}
          title={props.title2}
          link={props.link2}
        />
        <DonationOrganizationItem
          img={props.img3}
          title={props.title3}
          link={props.link3}
        />
      </div>
    </div>
  );
};

export default DonationOrganization;
