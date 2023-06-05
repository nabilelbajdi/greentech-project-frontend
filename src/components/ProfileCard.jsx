import Image from 'next/image';
import Button from './Button';
import { useSession } from 'next-auth/react';

const ProfileCard = ({ user }) => {
  const { data: session } = useSession();
  return (
    <div className='flex flex-col items-center justify-center gap-4 mt-4'>
      <Image
        src={user.image}
        alt='användarens profilbild'
        height={100}
        width={100}
        className='rounded-full'
      />
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      {user.id !== session.user.id && (
        <div className='flex gap-8'>
          <Button title='Lägg till vän' />
          <Button title='Chatta' />
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
