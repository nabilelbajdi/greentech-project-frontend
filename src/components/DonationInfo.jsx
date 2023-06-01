import Image from 'next/image';
import { getWeekName, getMonthName } from '@/functions/daysAndMonths';
import Map from './Map';
import Button from './Button';

const DonationInfo = ({ donation }) => {
  let time = new Date(donation.pickUpTime);
  time = time
    .toTimeString()
    .split('')
    .filter((l, indx) => indx <= 4)
    .join('');

  let date = new Date(donation.pickUpDate);

  const sDay = getWeekName(date.getDay());
  const sMonth = getMonthName(date.getMonth());
  const sDate = date.getDate();
  const sYear = date.getFullYear();

  return (
    <section className='flex justify-center p-4 w-full'>
      <div className='w-4/5'>
        <div className='grid grid-cols-2 mb-6 gap-4'>
          {donation.image ? (
            <Image
              src={donation.image.url}
              alt='evenemangsbild'
              priority
              height={200}
              width={400}
              className='h-auto w-full flex-2 bg-slate-300'
            />
          ) : (
            <Image
              src='https://img.freepik.com/free-vector/flat-hand-drawn-clothing-donation-illustration-with-people_23-2148830041.jpg?w=1800&t=st=1685454523~exp=1685455123~hmac=5634d24e33bf8be7383bf3ff61f2a0196d355251f5dfd4bb6d3d185185bf4095'
              alt='donationsbild'
              priority
              height={300}
              width={700}
              className='h-auto w-full rounded-xl bg-slate-300 flex items-center justify-center m-auto'
            />
          )}

          <div className='flex flex-col justify-between p-2 mb-4 w-full'>
            <div className='flex flex-col gap-4'>
              <h1 className='text-4xl font-bold'>{donation.name}</h1>
              <div className='flex gap-4'>
                <p className='font-bold'>Kategori:</p> {donation.category}
                <p className='font-bold'>Skick:</p> {donation.condition}
              </div>
              <p>{donation.description}</p>
            </div>
            <div className='flex gap-4 items-center'>
              <Image
                src={donation.user.image}
                alt='admins profilbild'
                height={40}
                width={40}
                className='rounded-full'
              />
              {`${donation.user.firstName} ${donation.user.lastName}`}
              <div>
                <Button title='Skicka meddelande' />
              </div>
            </div>
          </div>
        </div>
        <div className='flex md:flex-row flex-col gap-4 w-full'>
          <div className='flex flex-col w-full'>
            <div className='bg-gray-100 p-4 rounded-xl'>
              <div className='flex flex-col gap-2 mb-6 py-4'>
                <h2 className='text-xl font-semibold text-center'>
                  Upphämtning
                </h2>
                <p>
                  Doneras av:{' '}
                  {`${donation.user.firstName} ${donation.user.lastName}`}
                </p>
                <p>
                  Datum: {`${sDay} ${sDate} ${sMonth} ${sYear} Kl: ${time}`}
                </p>
                <p>Plats: {donation.pickUpLocation}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col md:w-2/3 w-full gap-4'>
            <div className='h-fit rounded-xl bg-gray-100'>
              <Map
                selected={{
                  lat: parseFloat(donation.lat),
                  lng: parseFloat(donation.lng),
                }}
                height='h-96'
                width='w-full'
                search={false}
              />
              <p className='px-4 py-6'>{donation.pickUpLocation}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationInfo;
