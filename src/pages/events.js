import Button from '@/components/Button';
import EventCreator from '@/components/EventCreator';
import EventPreview from '@/components/EventPreview';
import getEventPageProps from '@/utils/getEventPageProps';
import Link from 'next/link';
import { useState } from 'react';
export const getServerSideProps = getEventPageProps;

const EventsPage = (props) => {
  const [newEvent, setNewEvent] = useState(false);
  return (
    <main className='flex flex-col items-center justify-center p-2'>
      <Button
        title='Skapa nytt Event'
        callback={() => setNewEvent(!newEvent)}
      />
      {newEvent && (
        <EventCreator newEvent={newEvent} setNewEvent={setNewEvent} />
      )}
      <div className='mt-6 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-6'>
        {props.events.map((event) => (
          <Link href={`/events/${event.id}`} key={event.id}>
            <EventPreview event={event} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default EventsPage;
