import Image from 'next/image';
import ImageModal from './ImageModal';
import { useEffect, useState } from 'react';

const Gallery = ({ images, size }) => {
  console.log(images);
  const [modalImage, setModalImage] = useState();

  const closeModal = () => {
    setModalImage();
  };

  const imagesReversed = [...images].reverse();

  return (
    <>
      <div className='grid grid-cols-3 self-start place-items-center gap-1 rounded-2xl bg-gray-100 overflow-hidden mt-[188px] shadow-md max-w-sm'>
        {imagesReversed.slice(0, size).map((image, idx) => {
          return (
            <div
              key={image.id}
              className='aspect-square cursor-pointer hover:opacity-90 hover:scale-[1.02]'
              onClick={() => {
                setModalImage(images.length - idx - 1);
              }}
            >
              <Image
                src={image.url}
                width={500}
                height={500}
                className='w-full h-full object-cover '
              />
            </div>
          );
        })}
      </div>
      {modalImage >= 0 && (
        <ImageModal images={images} idx={modalImage} closeModal={closeModal} />
      )}
    </>
  );
};

export default Gallery;
