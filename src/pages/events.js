import Button from '@/components/Button';
import ModalCreator from '@/components/ModalCreator';
import getEventPageProps from '@/utils/getEventPageProps';
import { useState } from 'react';
import PaginationPage from '@/components/PaginationPage';
import Widget from '@/components/Widget';
import Image from 'next/image';
import RecycleSection from '@/components/recycleSection';
export const getServerSideProps = getEventPageProps;

const EventsPage = (props) => {
  const [newEvent, setNewEvent] = useState(false);

  return (
    <div className='w-full'>
      <main className='flex'>
        <div className='lg:ml-28 bg-white rounded-xl overflow-hidden w-full'>
          <div className='rounded-xl overflow-hidden'>
            <div className='w-fit mt-4 m-auto rounded-xl overflow-hidden'>
              <Image
                src='/event.jpg'
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
                title='Skapa nytt event'
                callback={() => setNewEvent(!newEvent)}
              />
            </div>
            <RecycleSection />
          </div>
          <div className='p-8 border-b-2'>
            <PaginationPage
              length={props.eventsLength}
              title='Delta i andra användares event'
              typeOfItem='event'
            />
          </div>
        </div>
        <Widget />
      </main>
      {newEvent && (
        <ModalCreator
          setNewItem={setNewEvent}
          showEndTime={true}
          typeOfItem='event'
        />
      )}
    </div>
  );
};

export default EventsPage;
