import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import Calendar from './Calendar';
import Map from './Map';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const EventCreator = ({ setNewEvent, event, edit }) => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const eventName = useRef();
  const description = useRef();
  const imageRef = useRef(null);
  const [uploadImages, setUploadImages] = useState();
  const [enableEndTime, setEnableEndTime] = useState(false);
  const [startDate, setStartDate] = useState(edit && event.start_date);
  const [endDate, setEndDate] = useState(
    edit && event.end_date && event.end_date
  );
  const [startTime, setStartTime] = useState(edit && event.start_time);
  const [endTime, setEndTime] = useState(edit && event.end_time);
  const [selected, setSelected] = useState(
    edit && {
      lat: parseFloat(event.lat),
      lng: parseFloat(event.lng),
    }
  );
  const [address, setAddress] = useState(edit && event.address);

  if (edit) {
    useEffect(() => {
      eventName.current.value = event.name;
      description.current.value = event.description;
    }, []);
  }

  const createEvent = async () => {
    let image;
    if (uploadImages) {
      image = await handleUploadImages();
    }

    const eventInfo = {
      name: eventName.current.value,
      image: uploadImages && image[0],
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      startTime:
        edit && startTime['$d'] === undefined
          ? startTime.slice(-5)
          : edit
          ? dayjs(startTime).format('HH:mm')
          : dayjs(startTime).format('HH:mm'),
      endDate: dayjs(endDate).format('YYYY-MM-DD'),
      endTime:
        edit && endTime['$d'] === undefined
          ? endTime.slice(-5)
          : edit
          ? dayjs(endTime).format('HH:mm')
          : dayjs(endTime).format('HH:mm'),
      address: address.formatted_address,
      lat: selected.lat.toString(),
      lng: selected.lng.toString(),
      description: description.current.value,
    };

    let response;
    if (edit) {
      console.log('edit: ', eventInfo);
      response = await fetch(`/api/prisma/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventInfo }),
      });
    } else {
      response = await fetch('/api/prisma/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventInfo }),
      });
    }

    const data = await response.json();
    console.log('data: ', data);
    push(`/events/${data.id}`);
    setNewEvent(false);
  };

  const handleSubmit = (e) => {
    createEvent();

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
      onClick={(e) => (setNewEvent(false), e.stopPropagation())}
    >
      <form
        className='flex flex-col rounded-lg items-center h-full w-1/2 bg-white overflow-y-scroll'
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className='border-b-2 mt-4 w-full pb-4 text-center text-xl font-bold'>
          Skapa evenemang
        </h1>
        {/* Image upload goes here */}
        <div className='relative h-68 w-full bg-gray-200'>
          {uploadImages ? (
            <Image
              src={URL.createObjectURL(uploadImages[0])}
              alt='evenemangsbild'
              height={300}
              width={500}
              className='w-full h-full'
            />
          ) : (
            <Image
              src='https://img.freepik.com/free-vector/employee-marking-deadline-day-man-with-pencil-appointing-date-event-making-note-calendar-vector-illustration-schedule-agenda-time-management_74855-8347.jpg?w=2000&t=st=1684247023~exp=1684247623~hmac=908c558882f8adbb9fff5091df11cf306db9cf59aecebece9d18b2ca83de6110'
              alt='evenemangsbild'
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
            Lägg till omslagsfoto
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
              <p className=' text-sm'>Värd</p>
            </div>
          </div>
          {/* Name */}
          <input
            type='text'
            placeholder='Evenemangets namn'
            className='px-2 py-4 border-2 rounded-lg'
            ref={eventName}
          />
          {/* Date & time */}
          <div className='flex flex-col items-start gap-2 w-full'>
            <Calendar
              datumText={'Startdatum'}
              tidText={'Starttid'}
              setSelectedDate={setStartDate}
              setSelectedTime={setStartTime}
              dateValue={edit ? startDate : ''}
              timeValue={edit ? startTime : ''}
            />
            {enableEndTime ? (
              <>
                <Calendar
                  datumText={'SlutDatum'}
                  tidText={'Sluttid'}
                  setSelectedDate={setEndDate}
                  setSelectedTime={setEndTime}
                  dateValue={edit ? endDate : ''}
                  timeValue={edit ? endTime : ''}
                />
                <button
                  className='hover:text-green-500'
                  onClick={() => setEnableEndTime(!enableEndTime)}
                >
                  - Ta bort slutdatum och tid
                </button>
              </>
            ) : (
              <button
                className='hover:text-green-500'
                onClick={() => setEnableEndTime(!enableEndTime)}
              >
                + Lägg till slutdatum och tid
              </button>
            )}
          </div>
          {/* Address & lat/lng */}
          <Map
            placeholder={'Lägg till plats'}
            height='h-96'
            width='w-full'
            selected={selected}
            setSelected={setSelected}
            setAddress={setAddress}
            address={address !== null ? address : ''}
          />
          {/* Description text */}
          <textarea
            className='px-2 py-4 border-2 rounded-lg w-full h-60 resize-none'
            placeholder='Vad mer behöver man veta?'
            ref={description}
          />
        </div>
        <div className='sticky z-10 bottom-0 w-full bg-white-200 p-1'>
          <button className='p-4 bg-chas-gradient-primary rounded-xl w-full hover:bg-chas-gradient-secondary text-white'>
            {edit ? 'Uppdatera evenemang' : 'Skapa evenemang'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventCreator;
