import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/outline';

const ImageModal = ({ images, idx, closeModal, reversed }) => {
  const [currentImage, setCurrentImage] = useState(idx);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const nextImage = () => {
    if (currentImage != images.length - 1) {
      setCurrentImage((old) => old + 1);
    } else {
      setCurrentImage(0);
    }
  };

  const previousImage = () => {
    if (currentImage != 0) {
      setCurrentImage((old) => old - 1);
    } else {
      setCurrentImage(images.length - 1);
    }
  };

  return (
    <div className='fixed inset-0 z-[51] bg-black bg-opacity-60 flex justify-center items-center'>
      <div className='absolute inset-0 z-0' onClick={() => closeModal()} />
      <div className='z-10 flex justify-center gap-1 md:gap-2'>
        <div className='relative flex items-center'>
          <div className='absolute inset-0' onClick={closeModal}></div>
          <button
            className='z-[100] cursor-pointer w-10 h-10 text-white hover:text-gray-400 shrink-0'
            onClick={!reversed ? previousImage : nextImage}
          >
            <ArrowLeftIcon />
          </button>
        </div>
        <Image
          src={images[currentImage].url}
          width={700}
          height={700}
          className='max-w-[75%] md:max-w-[80%] max-h-screen py-5 object-contain'
          alt='Image in modal'
        />
        <div className='relative flex items-center'>
          <div className='absolute inset-0' onClick={closeModal}></div>
          <button
            className=' z-[100] cursor-pointer w-10 h-10 rounded-full text-white hover:text-gray-400 shrink-0'
            onClick={!reversed ? nextImage : previousImage}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
