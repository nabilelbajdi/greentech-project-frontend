import Image from 'next/image';
import ImageModal from './ImageModal';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const FriendsPreview = ({ friends = [], width, height }) => {

  const previewFriends = [...friends];

  const size = width * height;

  if (previewFriends.length < width * height) {
    for (let i = previewFriends.length; i < width * height; i++) {
      previewFriends.push(null);
    }
  }

  const gridCols = [
    'grid-cols-0',
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
    'grid-cols-7',
    'grid-cols-8',
  ];

  const gridRows = [
    'grid-rows-0',
    'grid-rows-1',
    'grid-rows-2',
    'grid-rows-3',
    'grid-rows-4',
    'grid-rows-5',
    'grid-rows-6',
    'grid-rows-7',
    'grid-rows-8',
  ];

  return (
    <>
      <div
        className={`grid ${gridCols[width]} ${gridRows[height]} self-start place-items-center gap-1 rounded-2xl rounded-tr-none rounded-tl-none bg-gray-100 overflow-hidden  shadow-md`}
      >
        {previewFriends.map((user, idx) => {

          let pic;

          if (user) {
            if (user.profilePicture) {

              pic = user.profilePicture

            } else {

              pic = user.image;

            }
          }

          return (
            <div key={`user${idx}`} className='w-full h-full'>
              {user === null ? (
                <Image
                  src={'/placeholder.png'}
                  className='aspect-square w-full h-full bg-gray-200'
                  width={500}
                  height={500}
                  alt='placeholder image'
                />
              ) : (
                <Link href={`/${user.userPath}`}>

                  <Image
                    src={pic}
                    width={500}
                    height={500}
                    className='w-full h-full object-cover aspect-square cursor-pointer'
                    alt='Gallery image'
                    onClick={() => {

                    }}
                  />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FriendsPreview;
