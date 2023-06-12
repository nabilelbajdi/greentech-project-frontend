import Event from '@/components/Event';
import getEventSlugPageProps from '@/utils/getEventSlugPageProps';
import FriendWidget from '@/components/FriendWidget';
import Widget from '@/components/Widget';
export const getServerSideProps = getEventSlugPageProps;

const EventPage = (props) => {
  return (
    <div className='w-full'>
      <main className='flex'>
        {props.event ? (
          <>
            <div className='lg:ml-28 w-full'>
              <Event event={props.event} />
            </div>
            <Widget />
          </>
        ) : (
          <h1>Evenemanget existerar inte</h1>
        )}
      </main>
    </div>
  );
};

export default EventPage;
