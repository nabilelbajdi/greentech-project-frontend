import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/outline';

const ImageModal = ({ images, idx, closeModal, next, previous }) => {
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
      <div className='z-10 flex items-center gap-2'>
        <button
          className=' z-[100] cursor-pointer w-10 h-10 rounded-full text-white hover:text-gray-400'
          onClick={previousImage}
        >
          <ArrowLeftIcon />
        </button>
        <Image src={images[currentImage].url} width={700} height={700}></Image>
        <button
          className=' z-[100] cursor-pointer w-10 h-10 rounded-full text-white hover:text-gray-400'
          onClick={nextImage}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
