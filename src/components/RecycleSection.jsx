import Image from 'next/image';
import Button from './Button';
import { useRouter } from 'next/navigation';

const RecycleSection = () => {
  const router = useRouter();
  return (
    <div className='flex py-6 px-8 border-b-2'>
      <Image
        src='/recycle-station.jpg'
        alt='plaståtervinning'
        height={250}
        width={250}
      />

      <div className='flex flex-col justify-between p-4'>
        <p>
          Miljöstationer är en viktig del i sorterandet, och ibland kan det vara
          svårt att veta vart man ska åka med allt skräp. Hitta olika stationer
          med kartan nedanför.
        </p>
        <div className='m-auto'>
          <Button
            title='Hitta återvinningsstationer'
            callback={() => router.push('/recyclemap')}
          />
        </div>
      </div>
    </div>
  );
};

export default RecycleSection;
