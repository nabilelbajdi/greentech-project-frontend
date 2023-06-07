import Image from 'next/image';
import { getWeekName, getMonthName } from '@/functions/daysAndMonths';
import Map from './Map';
import Posts from './Posts';
import { useState } from 'react';
import { CalendarIcon } from '@heroicons/react/solid';
import Button from './Button';
import ParticipantCard from './ParticipantCard';
import { useRouter } from 'next/router';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import EventCreator from './EventCreator';

const Event = ({ event }) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState(event.posts);
  const [edit, setEdit] = useState(false);
  const { push } = useRouter();
  const startTime = event.start_time;

  let startDate = new Date(event.start_date);

  const sDay = getWeekName(startDate.getDay());
  const sMonth = getMonthName(startDate.getMonth());
  const sDate = startDate.getUTCDate();
  const sYear = startDate.getFullYear();

  let endDate;
  let eDay;
  let eMonth;
  let eDate;
  let eYear;
  let endTime;

  if (event.end_date) {
    endDate = new Date(event.end_date);
    eDay = getWeekName(endDate.getDay());
    eMonth = getMonthName(endDate.getMonth());
    eDate = endDate.getUTCDate();
    eYear = endDate.getFullYear();
    endTime = event.end_time;
  }

  const handleDelete = async () => {
    const response = await fetch(`/api/prisma/events/${event.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      const deletedEvent = await response.json();
      push('/events');
    }
  };

  const handleEdit = async () => {
    const response = await fetch(`/api/prisma/events/${event.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      const eventInEdit = await response.json();
      setEdit(true);
    }
  };

  return (
    <section className='relative p-4 w-full bg-gray-100 rounded-xl'>
      <div>
        {event.image ? (
          <Image
            src={event.image.url}
            alt='evenemangsbild'
            priority
            height={300}
            width={700}
            className='h-96 w-auto bg-slate-300'
          />
        ) : (
          <Image
            src='https://img.freepik.com/free-vector/employee-marking-deadline-day-man-with-pencil-appointing-date-event-making-note-calendar-vector-illustration-schedule-agenda-time-management_74855-8347.jpg?w=2000&t=st=1684247023~exp=1684247623~hmac=908c558882f8adbb9fff5091df11cf306db9cf59aecebece9d18b2ca83de6110'
            alt='evenemangsbild'
            priority
            height={300}
            width={700}
            className='h-96 w-auto bg-slate-300'
          />
        )}
        <div>
          {/* Edit/delete if session user is the admin  */}
          {event.admin_id === session.user.id && (
            <div className='absolute top-2 right-2 flex gap-4'>
              <button onClick={handleEdit} className='h-5 w-5'>
                <PencilIcon />
              </button>
              <button className='h-5 w-5' onClick={handleDelete}>
                <TrashIcon />
              </button>
            </div>
          )}
        </div>
        <div className='flex flex-col gap-2 p-2 border-b-2 mb-4'>
          <h1 className='text-4xl font-bold'>{event.name}</h1>
          <div className='flex lg:flex-row flex-col justify-between lg:items-center items-start gap-3'>
            <div className='flex items-center gap-2'>
              <CalendarIcon className='h-10 w-10' />
              <div className='flex flex-col'>
                <p className='font-bold text-lg'>
                  {`${sDay} ${sDate} ${sMonth} ${sYear} Kl: ${startTime}`}{' '}
                  {event.end_date &&
                    `- ${eDay} ${eDate} ${eMonth} ${eYear} Kl ${endTime}`}
                </p>
              </div>
            </div>
            <div className='flex flex-col gap-2 my-4'>
              {/* add functionality */}
              <Button title='Lägg till i kalender' />
              <button className='border-b-2 border-black'>
                Dela med en vän
              </button>
            </div>
          </div>

          <p>{event.address}</p>
          <div className='flex gap-4 items-center'>
            <Image
              src={event.admin.image}
              alt='admins profilbild'
              height={40}
              width={40}
              className='rounded-full'
            />
            {event.admin.name}
          </div>
        </div>
        <div className='flex gap-4 w-full'>
          <div className='flex flex-col w-full gap-2'>
            <div className='bg-white p-4 rounded-xl flex flex-col'>
              <div className='flex lg:flex-row flex-col justify-between mb-4'>
                <div>
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-xl font-semibold text-center'>
                      Information
                    </h2>
                    <p>Evenemang av: {event.admin.name}</p>
                    <p>
                      Datum: {sDate}/{startDate.getMonth()}{' '}
                      {eDate && `- ${eDate}/${endDate.getMonth()}`}
                    </p>
                    <p>
                      Tid: {startTime} {endTime && `- ${endTime}`}
                    </p>
                    <p>Address: {event.address}</p>
                  </div>
                  <p className='mt-4'>{event.description}</p>
                </div>
                <div className='h-fit lg:w-96 w-full rounded-xl lg:mt-0 mt-4 bg-gray-100'>
                  <Map
                    selected={{
                      lat: parseFloat(event.lat),
                      lng: parseFloat(event.lng),
                    }}
                    height='h-96'
                    width='w-full'
                    search={false}
                  />
                </div>
              </div>
              {/* add functionality */}
              <Button title='Anmäl dig här' />
            </div>
            {/* Participants */}
            <div className='bg-white p-4 rounded-xl flex flex-col'>
              <h2 className='text-xl font-semibold text-center'>Deltagare</h2>
              <div className='flex gap-2 mt-2'>
                {/* map through participants when function is added */}
                <ParticipantCard img='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80' />
                <ParticipantCard img='https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' />
                <ParticipantCard img='https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' />
                <ParticipantCard img='https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' />
              </div>
            </div>
            <div>
              <Posts posts={posts} setPosts={setPosts} eventId={event.id} />
            </div>
          </div>
        </div>
      </div>
      {edit && <EventCreator setNewEvent={setEdit} event={event} edit={true} />}
    </section>
  );
};

export default Event;
