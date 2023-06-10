import Image from 'next/image';

const ParticipantCard = ({ img }) => {
  return (
    <div className='flex items-center justify-center bg-gradient-to-b from-chas-gradient-primary to-chas-gradient-secondary h-40 w-28 rounded-xl'>
      <div className='rounded-full h-20 w-20 flex items-center justify-center overflow-hidden'>
        <Image src={img} alt='deltagarens bild' height={100} width={100} />
      </div>
    </div>
  );
};

export default ParticipantCard;
