import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Calendar from './Calendar';
import Map from './Map';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const DonationCreator = ({ setNewDonation, edit, donation }) => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const donationName = useRef(null);
  const description = useRef(null);
  const category = useRef(null);
  const condition = useRef(null);
  const imageRef = useRef(null);

  const [uploadImages, setUploadImages] = useState();
  const [date, setDate] = useState(edit && donation.pickUpDate);
  const [time, setTime] = useState(edit && donation.pickUpTime);
  const [selected, setSelected] = useState(
    edit && {
      lat: parseFloat(donation.lat),
      lng: parseFloat(donation.lng),
    }
  );
  const [address, setAddress] = useState(edit && donation.pickUpLocation);

  if (edit) {
    useEffect(() => {
      donationName.current.value = donation.name;
      description.current.value = donation.description;
      category.current.value = donation.category;
      condition.current.value = donation.condition;
    }, []);
  }

  const createDonation = async () => {
    let image;
    if (uploadImages) {
      image = await handleUploadImages();
    }
    const donationInfo = {
      name: donationName.current.value,
      description: description.current.value,
      category: category.current.value,
      condition: condition.current.value,
      image: uploadImages && image[0],
      pickUpTime:
        edit && time['$d'] === undefined
          ? time.slice(-5)
          : edit
          ? dayjs(time).format('HH:mm')
          : dayjs(time).format('HH:mm'),
      pickUpDate: dayjs(date).format('YYYY-MM-DD'),
      pickUpLocation: address.formatted_address,
      lat: selected.lat.toString(),
      lng: selected.lng.toString(),
    };

    let response;
    if (edit) {
      response = await fetch(`/api/prisma/donations/${donation.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donationInfo }),
      });
    } else {
      response = await fetch('/api/prisma/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donationInfo }),
      });
    }

    const data = await response.json();
    setNewDonation(false);
    push(`/donations/${data.id}`);
  };

  const handleSubmit = (e) => {
    createDonation();
    e.preventDefault();
  };

  const handleUploadImages = async () => {
    const form = new FormData();

    uploadImages.forEach((image) => {
      form.append('images', image);
    });

    const response = await fetch('/api/images', {
      method: 'POST',
      body: form,
    });

    return await response.json();
  };

  return (
    <div
      className='fixed top-0 left-0 flex flex-col items-center justify-center p-10 h-screen w-screen z-50 bg-gray-900 bg-opacity-60'
      onClick={(e) => (setNewDonation(false), e.stopPropagation())}
    >
      <form
        className='flex flex-col rounded-lg items-center h-full w-1/2 bg-white overflow-y-scroll'
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className='border-b-2 mt-4 w-full pb-4 text-center text-xl font-bold'>
          {edit ? 'Redigera donation' : 'Skapa donation'}
        </h1>
        {/* Image upload goes here */}
        <div className='relative h-68 w-full bg-gray-200'>
          {uploadImages ? (
            <Image
              src={URL.createObjectURL(uploadImages[0])}
              alt='donationsbild'
              height={300}
              width={500}
              className='w-full h-full'
            />
          ) : (
            <Image
              src='https://img.freepik.com/free-vector/flat-hand-drawn-clothing-donation-illustration-with-people_23-2148830041.jpg?w=1800&t=st=1685454523~exp=1685455123~hmac=5634d24e33bf8be7383bf3ff61f2a0196d355251f5dfd4bb6d3d185185bf4095'
              alt='donationssbild'
              height={300}
              width={500}
              className='w-full h-full'
            />
          )}

          <button
            className='absolute bottom-4 right-8 p-2 bg-gray-300 rounded-xl hover:bg-green-500'
            type='button'
            onClick={() => imageRef.current.click()}
          >
            Lägg till bild
          </button>

          <input
            ref={imageRef}
            type='file'
            id='image'
            name='image'
            accept='image/png, image/jpeg, image/webp'
            onChange={(e) => {
              setUploadImages([...e.target.files]);
            }}
            hidden
          />
        </div>
        <div className='flex flex-col justify-start gap-4 p-4 w-full'>
          {/* Admin picture and name for event */}
          <div className='flex gap-4 items-center'>
            <Image
              src={session.user.image}
              alt='Användarens profilbild'
              width={40}
              height={40}
              className='rounded-full'
            />
            <div>
              <p className='font-semibold'>{session.user.name}</p>
              <p className=' text-sm'>Donerad av</p>
            </div>
          </div>
          {/* Title, category, condition */}
          <input
            type='text'
            placeholder='Titel'
            className='px-2 py-4 border-2 rounded-lg'
            ref={donationName}
          />
          <div className='flex items-center justify-center gap-10 px-4'>
            <div className='flex flex-col w-full'>
              <label htmlFor='category'>Kategori</label>
              <select id='category' required ref={category}>
                <option value='Kläder'>Kläder</option>
                <option value='Leksaker'>Leksaker</option>
                <option value='Möbler'>Möbler</option>
                <option value='Inredning'>Inredning</option>
                <option value='Fordon'>Fordon</option>
              </select>
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='condition'>Skick</label>
              <select id='condition' required ref={condition}>
                <option value='Ny'>Ny</option>
                <option value='Använd fåtal gånger'>
                  Använd fåtal gånger (1-3)
                </option>
                <option value='Använd'>Använd</option>
                <option value='Sliten'>Sliten</option>
              </select>
            </div>
          </div>

          {/* Date & time */}
          <div className='flex flex-col items-start gap-2 w-full'>
            <Calendar
              datumText={'Datum för upphämtning'}
              tidText={'Tid för upphämtning'}
              setSelectedDate={setDate}
              setSelectedTime={setTime}
              dateValue={edit ? date : ''}
              timeValue={edit ? time : ''}
            />
          </div>
          {/* Address & lat/lng */}
          <Map
            placeholder={'Plats för upphämtning'}
            height='h-96'
            width='w-full'
            selected={selected}
            address={address !== null ? address : ''}
            setSelected={setSelected}
            setAddress={setAddress}
          />
          {/* Description text */}
          <textarea
            className='px-2 py-4 border-2 rounded-lg w-full h-60 resize-none'
            placeholder='Detaljer om donationen?'
            ref={description}
          />
        </div>
        <div className='sticky flex justify-center z-10 bottom-0 w-full bg-white-200 p-1'>
          <button className='p-4 bg-chas-gradient-primary rounded-xl w-full hover:bg-chas-gradient-secondary text-white'>
            {edit ? 'Uppdatera donation' : 'Skapa donation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonationCreator;
