import Image from 'next/image';
import { getWeekName, getMonthName } from '@/functions/daysAndMonths';
import Map from './Map';
import Button from './Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DonationCreator from './DonationCreator';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';

const DonationInfo = ({ donation }) => {
  const { data: session } = useSession();
  const [edit, setEdit] = useState(false);
  const { push } = useRouter();
  const time = donation.pickUpTime;

  let date = new Date(donation.pickUpDate);

  const sDay = getWeekName(date.getDay());
  const sMonth = getMonthName(date.getMonth());
  const sDate = date.getDate();
  const sYear = date.getFullYear();

  const handleDelete = async () => {
    const response = await fetch(`/api/prisma/donations/${donation.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      const deletedDonation = await response.json();
      push('/donations');
    }
  };

  const handleEdit = async () => {
    const response = await fetch(`/api/prisma/donations/${donation.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      const donationInEdit = await response.json();
      setEdit(true);
    }
  };

  return (
    <section className='relative p-4 w-full bg-gray-100 rounded-xl'>
      <div>
        {donation.image ? (
          <Image
            src={donation.image.url}
            alt='evenemangsbild'
            priority
            height={200}
            width={400}
            className='h-96 w-full bg-slate-300'
          />
        ) : (
          <Image
            src='https://img.freepik.com/free-vector/flat-hand-drawn-clothing-donation-illustration-with-people_23-2148830041.jpg?w=1800&t=st=1685454523~exp=1685455123~hmac=5634d24e33bf8be7383bf3ff61f2a0196d355251f5dfd4bb6d3d185185bf4095'
            alt='donationsbild'
            priority
            height={300}
            width={700}
            className='h-96 w-full bg-slate-300'
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
        </div>

        <div className='flex md:flex-row flex-col bg-white rounded-xl gap-4 w-full'>
          <div className='flex lg:flex-row flex-col justify-between w-full '>
            <div className='p-4'>
              <div className='flex flex-col gap-2 mb-6 py-4'>
                <h2 className='text-xl font-semibold text-center'>
                  Upphämtning
                </h2>
                <p>
                  Datum: {`${sDay} ${sDate} ${sMonth} ${sYear} Kl: ${time}`}
                </p>
                <p>Plats: {donation.pickUpLocation}</p>
              </div>
              <div className='flex gap-4 items-center'>
                <p>Doneras av:</p>
                <Image
                  src={donation.user.image}
                  alt='admins profilbild'
                  height={40}
                  width={40}
                  className='rounded-full'
                />
                <p>{`${donation.user.firstName} ${donation.user.lastName}`}</p>

                <div>
                  {/* Edit/delete if session user is the donator, or contact donator if othwerwise  */}
                  {donation.user.id === session.user.id ? (
                    <div className='absolute top-2 right-2 flex gap-4'>
                      <button onClick={handleEdit} className='h-5 w-5'>
                        <PencilIcon />
                      </button>
                      <button className='h-5 w-5' onClick={handleDelete}>
                        <TrashIcon />
                      </button>
                    </div>
                  ) : (
                    <Button title='Skicka meddelande' />
                  )}
                </div>
              </div>
            </div>
            <div className='h-fit lg:w-96 w-full rounded-xl lg:mt-0 mt-4 bg-gray-100'>
              <Map
                selected={{
                  lat: parseFloat(donation.lat),
                  lng: parseFloat(donation.lng),
                }}
                height='h-96'
                width='w-full'
                search={false}
              />
            </div>
          </div>
        </div>
      </div>
      {edit && (
        <DonationCreator
          setNewDonation={setEdit}
          donation={donation}
          edit={true}
        />
      )}
    </section>
  );
};

export default DonationInfo;
