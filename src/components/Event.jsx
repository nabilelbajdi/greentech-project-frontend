import Image from 'next/image';
import { getWeekName, getMonthName } from '@/functions/daysAndMonths';
import Map from './Map';
import Posts from './Posts';
import { useState } from 'react';

const Event = ({ event }) => {
  const [posts, setPosts] = useState(event.posts);
  let startTime = new Date(event.start_time);
  startTime = startTime
    .toTimeString()
    .split('')
    .filter((l, indx) => indx <= 4)
    .join('');

  let startDate = new Date(event.start_date);

  const sDay = getWeekName(startDate.getDay());
  const sMonth = getMonthName(startDate.getMonth());
  const sDate = startDate.getDate();
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
    eDate = endDate.getDate();
    eYear = endDate.getFullYear();
    endTime = new Date(event.end_time);
    endTime = endTime
      .toTimeString()
      .split('')
      .filter((l, indx) => indx <= 4)
      .join('');
  }

  return (
    <section className='p-4 w-full'>
      <div>
        {event.image ? (
          <Image
            src={event.image.url}
            alt='evenemangsbild'
            priority
            height={300}
            width={700}
            className='h-96 w-full bg-slate-300'
          />
        ) : (
          <Image
            src='https://img.freepik.com/free-vector/employee-marking-deadline-day-man-with-pencil-appointing-date-event-making-note-calendar-vector-illustration-schedule-agenda-time-management_74855-8347.jpg?w=2000&t=st=1684247023~exp=1684247623~hmac=908c558882f8adbb9fff5091df11cf306db9cf59aecebece9d18b2ca83de6110'
            alt='evenemangsbild'
            priority
            height={300}
            width={700}
            className='h-96 w-full bg-slate-300'
          />
        )}

        <div className='flex flex-col gap-2 p-2 border-b-2 mb-4'>
          <p className='font-bold text-lg'>
            {`${sDay} ${sDate} ${sMonth} ${sYear} Kl: ${startTime}`}{' '}
            {event.end_date &&
              `- ${eDay} ${eDate} ${eMonth} ${eYear} Kl: ${endTime}`}
          </p>
          <h1 className='text-4xl font-bold'>{event.name}</h1>
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
          <div className='flex flex-col w-full'>
            <div className='bg-gray-100 p-4 rounded-xl'>
              <div className='flex flex-col gap-2'>
                <h2 className='text-xl font-semibold text-center'>
                  Information
                </h2>
                <p>Evenemang av: {event.admin.name}</p>
                <p>
                  Datum: {sDate}/{startDate.getMonth() + 1}{' '}
                  {eDate && `- ${eDate}/${endDate.getMonth() + 1}`}
                </p>
                <p>
                  Tid: {startTime} {endTime && `- ${endTime}`}
                </p>
                <p>Address: {event.address}</p>
              </div>
              <div>
                <p>Om evenemanget:</p>
                <p>{event.description}</p>
              </div>
            </div>
            <div>
              <Posts posts={posts} setPosts={setPosts} eventId={event.id} />
            </div>
          </div>
          <div className='flex flex-col w-2/3 gap-4'>
            <div className='h-fit rounded-xl bg-gray-100'>
              <Map
                selected={{
                  lat: parseFloat(event.lat),
                  lng: parseFloat(event.lng),
                }}
                height='h-96'
                width='w-full'
                search={false}
              />
              <p className='px-4 py-6'>{event.address}</p>
            </div>
            <div className='rounded-xl bg-gray-100 px-4 py-6'>
              <h2>Deltagare</h2>
              Lägg till deltagare här
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Event;
