import ImageModal from '@/components/ImageModal';
import getProfilePageProps from '@/utils/getProfilePageProps';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
export const getServerSideProps = getProfilePageProps;

const GalleryPage = (props) => {
  const [modalImage, setModalImage] = useState();

  const closeModal = () => {
    setModalImage();
  };

  const { data: session, status } = useSession();
  let ownProfile = false;
  let name = `${props.user.firstName} ${props.user.lastName}s`;
  if (props.user.userPath === session.user.userPath) {
    ownProfile = true;
    name = 'Mitt';
  }
  const imagesReversed = [...props.user.images].reverse();

  return (
    <div className='w-full'>
      <main className='flex flex-col'>
        {props.user ? (
          <div className='mt-8 mx-10'>
            <div className='flex justify-between border-b border-gray-300 py-2 mb-4 '>
              <h2 className='text-lg'>{name} galleri</h2>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-4 gap-y-4'>
              {imagesReversed.map((image, index) => {
                return (
                  <Image
                    width={700}
                    height={700}
                    key={index}
                    src={image.url}
                    className='aspect-square object-cover cursor-pointer rounded-lg'
                    onClick={() => {
                      setModalImage(imagesReversed.length - index - 1);
                    }}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <h1>Användaren hittades inte</h1>
        )}
      </main>
      {modalImage >= 0 && (
        <ImageModal
          images={props.user.images}
          idx={modalImage}
          reversed={true}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default GalleryPage;
