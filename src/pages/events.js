import Button from '@/components/Button';
import EventCreator from '@/components/EventCreator';
import EventPreview from '@/components/EventPreview';
import getEventPageProps from '@/utils/getEventPageProps';
import { useState } from 'react';
import PaginationPage from '@/components/PaginationPage';
import Widget from '@/components/Widget';
import Image from 'next/image';
export const getServerSideProps = getEventPageProps;

const EventsPage = (props) => {
  const [newEvent, setNewEvent] = useState(false);
  // const correctStartDate = (
  //   parseInt(startDate.slice(-2)) + 1
  // ).toString();
  return (
    <div className='w-full'>
      <main className='flex'>
        <div className='lg:ml-28 bg-white rounded-xl overflow-hidden w-full'>
          <div className='rounded-xl overflow-hidden'>
            <div className='w-fit mt-4 m-auto rounded-xl overflow-hidden'>
              <Image
                src='https://img.freepik.com/free-vector/time-management-calendar-method-appointment-planning-business-organizer-people-drawing-mark-work-schedule-cartoon-characters-colleagues-teamwork_335657-2096.jpg?w=1060&t=st=1686051710~exp=1686052310~hmac=64c2ffbabf3f7d82120fdc063ab738da367bf40e3a40859f456d0799c2514db8'
                alt='eventbild'
                priority
                height={300}
                width={400}
              />
            </div>
            <div className='p-8 flex flex-col gap-6 border-b-2'>
              <p>
                Låt oss ta ansvar för att bevara våra skogar och vatten, skydda
                våra hotade arter och förvalta våra naturresurser på ett
                hållbart sätt. Låt oss vara förebilder för resten av världen när
                det gäller miljövänlighet och ekologiskt medvetande.
              </p>
              <p>
                Tillsammans kan vi skapa en framtid där naturen blomstrar, där
                människor lever i harmoni med sitt omgivande ekosystem och där
                vår planet är trygg för kommande generationer att utforska och
                njuta av. Låt oss vara den förändring vi önskar se i världen och
                låt vår kärlek till miljön vara vår inspiration och drivkraft.
              </p>
              <p>
                Städa parker, håll föredrag, skapa ett evenemang och ta steget
                mot en bättre värld!
              </p>
              <Button
                title='Skapa nytt Event'
                callback={() => setNewEvent(!newEvent)}
              />
            </div>
          </div>
          <div className='p-8 border-b-2'>
            <PaginationPage
              length={props.eventsLength}
              item='events'
              title='Delta i andra användares event'
            />
          </div>
        </div>
        <Widget />
      </main>
      {newEvent && (
        <EventCreator newEvent={newEvent} setNewEvent={setNewEvent} />
      )}
    </div>

    // <main className='flex flex-col items-center justify-center p-2'>
    // <Button
    //   title='Skapa nytt Event'
    //   callback={() => setNewEvent(!newEvent)}
    // />
    // {newEvent && (
    //   <EventCreator newEvent={newEvent} setNewEvent={setNewEvent} />
    // )}
    // <div className='mt-6 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-6'>
    //   {props.events.map((event) => (
    //     <Link href={`/events/${event.id}`} key={event.id}>
    //       <EventPreview event={event} />
    //     </Link>
    //   ))}
    // </div>
    // </main>
  );
};

export default EventsPage;