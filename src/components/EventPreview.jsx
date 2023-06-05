import Image from 'next/image';

const EventPreview = ({ event }) => {
  return (
    <div className='relative flex flex-col items-center overflow-hidden rounded-xl'>
      <div className='bg-white w-full h-60 rounded-xl flex items-center justify-center'>
        <Image
          src={
            !event.image
              ? 'https://img.freepik.com/free-vector/employee-marking-deadline-day-man-with-pencil-appointing-date-event-making-note-calendar-vector-illustration-schedule-agenda-time-management_74855-8347.jpg?w=2000&t=st=1684247023~exp=1684247623~hmac=908c558882f8adbb9fff5091df11cf306db9cf59aecebece9d18b2ca83de6110'
              : event.image
          }
          alt='eventbild'
          height={200}
          width={300}
          priority
        />
      </div>
      <div className='flex flex-col gap-2 w-full p-2'>
        <p>{event.name}</p>
      </div>
    </div>
  );
};

export default EventPreview;
