import Image from 'next/image';
import getImage from '@/functions/getTemporaryImage';

const ItemPreview = ({ item, type }) => {
  const temporaryImage = getImage(type);

  return (
    <div className='relative h-full flex flex-col items-center overflow-hidden rounded-xl shadow-md'>
      {item.category && (
        <p className='absolute top-2 right-2 bg-chas-gradient-primary text-white p-2 rounded-xl'>
          {item.category}
        </p>
      )}
      <div className='bg-white w-full h-60 rounded-xl flex items-center justify-center'>
        <Image
          src={!item.image ? temporaryImage : item.image}
          alt='förhandsbild'
          height={200}
          width={300}
          priority
        />
      </div>
      <div className='flex flex-col gap-2 w-full p-2'>
        <p className='font-bold'>{item.name}</p>
        {item.condition && <p>{item.condition}</p>}
      </div>
    </div>
  );
};

export default ItemPreview;
