import Sidebar from '@/components/Sidebar';
import Event from '@/components/Event';
import getEventPageProps from '@/utils/getEventPageProps';
export const getServerSideProps = getEventPageProps;

const EventPage = (props) => {
  return (
    <div className='w-full'>
      <main className='flex'>
        {props.event ? (
          <>
            <Sidebar />
            <Event event={props.event} />
          </>
        ) : (
          <h1>Evenemanget existerar inte</h1>
        )}
      </main>
    </div>
  );
};

export default EventPage;
