import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';

const StatusBox = ({ posts, setPosts, eventId }) => {
  const inputRef = useRef(null);
  const imageRef = useRef(null);
  const [uploadImages, setUploadImages] = useState();
  const { data: session, status } = useSession();

  const handleNewPost = async (e) => {
    e.preventDefault();

    let images;
    if (uploadImages) {
      images = await handleUploadImages();
      console.log(images);
    }

    const text = inputRef.current.value;

    const response = await fetch('/api/prisma/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text, images, event_id: eventId }),
    });
    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      console.log('Post uploaded, Success');
      const newPost = await response.json();
      setPosts([newPost, ...posts]);
      inputRef.current.value = '';
    }
  };

  const handleUploadImages = async () => {
    const form = new FormData();

    uploadImages.forEach((image) => {
      form.append('images', image);
    });

    const response = await fetch('api/images', {
      method: 'POST',
      body: form,
    });

    return await response.json();

    //return await data;
  };
  const removeImage = () => {
    setUploadImages(null);
  };

  if (status === 'authenticated') {
    return (
      <div className=' bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
        <div className='flex sm:space-x-4 p-4 items-center max-w-full'>
          <Image
            className=' hidden  sm:inline-flex rounded-full'
            src={session.user.image}
            alt='användarens bild'
            width={40}
            height={40}
          />
          <form className=' flex flex-1 break-words'>
            <input
              type='text'
              ref={inputRef}
              placeholder={`What's on your mind, ${session.user.name}?`}
              className=' rounded-full focus:outline-none h-12 bg-gray-100 flex-grow px-5 text-xs sm:text-base'
            />
            <button className='hidden' type='submit' onClick={handleNewPost}>
              Submit
            </button>
          </form>
          {uploadImages && (
            <div
              onClick={removeImage}
              className=' flex-col flex hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'
            >
              {uploadImages.map((image, idx) => {
                return (
                  <Image
                    className='object-contain p-1 m-1'
                    key={idx}
                    /* src={URL.createObjectURL(uploadImage)} */
                    src={URL.createObjectURL(image)}
                    alt='Image set to upload'
                    width={40}
                    height={40}
                  />
                );
              })}
              <p className=' text-xs text-red-500 text-center'>Remove</p>
            </div>
          )}
        </div>
        <div className=' justify-evenly flex p-3 border-t'>
          <div className='inputIcon flex-col sm:flex-row'>
            <VideoCameraIcon className=' h-7 text-red-500' />
            <p className='text-xs sm:text-sm xl:text-base'>Live Video</p>
          </div>
          <div
            className='inputIcon flex-col sm:flex-row'
            onClick={() => imageRef.current.click()}
          >
            <CameraIcon className=' h-7 text-green-400' />
            <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
            <input
              ref={imageRef}
              type='file'
              multiple
              id='image'
              name='image'
              accept='image/png, image/jpeg, image/webp'
              onChange={(e) => {
                setUploadImages([...e.target.files]);
              }}
              hidden
            />
          </div>
          <div className='inputIcon flex-col sm:flex-row hidden sm:inline-flex'>
            <EmojiHappyIcon className=' h-7 text-yellow-300' />
            <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
          </div>
        </div>
      </div>
    );
  }
  return <a href='/api/auth/signin'>Sign in</a>; //Lägg en else for status unauthorised
};

export default StatusBox;
