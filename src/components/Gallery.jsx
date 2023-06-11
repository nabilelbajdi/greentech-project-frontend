import Image from 'next/image';
import ImageModal from './ImageModal';
import { useEffect, useState } from 'react';

const Gallery = ({ images = [null], width, height }) => {
  const [modalImage, setModalImage] = useState();

  const closeModal = () => {
    setModalImage();
  };

  const imagesReversed = [...images].reverse();

  const size = width * height;

  if (imagesReversed.length < width * height) {
    for (let i = imagesReversed.length; i < width * height; i++) {
      imagesReversed.push(null);
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
        {imagesReversed.slice(0, size).map((image, idx) => {
          return (
            <div key={`image${idx}`}>
              {image === null ? (
                <div className='aspect-square w-full bg-gray-200' />
              ) : (
                <div
                  key={image.id}
                  className='aspect-square cursor-pointer'
                  onClick={() => {
                    setModalImage(images.length - idx - 1);
                  }}
                >
                  <Image
                    src={image.url}
                    width={500}
                    height={500}
                    className='w-full h-full object-cover'
                    alt='Gallery image'
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {modalImage >= 0 && (
        <ImageModal
          images={images}
          idx={modalImage}
          reversed={true}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default Gallery;
