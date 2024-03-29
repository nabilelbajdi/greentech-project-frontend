import Image from 'next/image';
const SidebarRow = ({ src, Icon, title }) => {
  return (
    <div className=' flex items-center justify-center sm:justify-normal space-x-2 p-2 hover:bg-gray-200 rounded-xl cursor-pointer'>
      {src && (
        <Image
          alt={`${title} icon`}
          src={src}
          className=' rounded-full'
          width={30}
          height={30}
        />
      )}
      {Icon && <Icon className='h-5 w-5 sm:h-8 sm:w-8 text-green-500' />}

      <p className='hidden sm:inline-flex font-medium'>{title}</p>
    </div>
  );
};

export default SidebarRow;
