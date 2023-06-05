import Image from 'next/image';

const DonationPreview = ({ donation }) => {
  return (
    <div className='relative flex flex-col items-center overflow-hidden rounded-xl'>
      <p className='absolute top-2 right-2 bg-chas-gradient-primary text-white p-2 rounded-xl'>
        {donation.category}
      </p>
      <div className='bg-white w-full h-60 rounded-xl flex items-center justify-center'>
        <Image
          src={
            !donation.image
              ? 'https://img.freepik.com/free-vector/flat-hand-drawn-clothing-donation-illustration-with-people_23-2148830041.jpg?w=1800&t=st=1685454523~exp=1685455123~hmac=5634d24e33bf8be7383bf3ff61f2a0196d355251f5dfd4bb6d3d185185bf4095'
              : donation.image
          }
          alt='donationsbild'
          height={200}
          width={300}
          priority
        />
      </div>
      <div className='flex flex-col gap-2 w-full p-2'>
        <p>{donation.name}</p>
        <p>{donation.condition}</p>
      </div>
    </div>
  );
};

export default DonationPreview;
