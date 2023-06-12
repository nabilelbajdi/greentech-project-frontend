import Image from 'next/image';
import Button from './Button';

const RecycleSection = () => {
  return (
    <div className='flex py-6 px-8 border-b-2'>
      <Image
        src='https://img.freepik.com/free-vector/eco-zero-waste-sorting-composition-with-image-girl-dropping-plastic-bottles-into-separate-container-vector-illustration_1284-67714.jpg?size=626&ext=jpg&uid=R83022760&ga=GA1.2.1110063008.1686571545&semt=ais'
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
