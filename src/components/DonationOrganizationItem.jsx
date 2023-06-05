import Image from 'next/image';
import Link from 'next/link';

const DonationOrganizationItem = ({ img, title, link }) => {
  return (
    <Link
      href={link}
      target='_blank'
      className='relative w-96 flex flex-col h-60 p-2 overflow-hidden'
    >
      <Image
        src={img}
        height={100}
        width={200}
        alt='organisationsbild'
        className='h-full w-96 rounded-xl flex items-center justify-center'
      />
      <p className='absolute bottom-0 bg-white bg-opacity-80 p-3 mb-2 rounded-xl'>
        {title}
      </p>
    </Link>
  );
};

export default DonationOrganizationItem;
