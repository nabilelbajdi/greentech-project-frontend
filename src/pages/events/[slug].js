import Sidebar from '@/components/Sidebar';
import Event from '@/components/Event';
import getEventPageProps from '@/utils/getEventPageProps';
export const getServerSideProps = getEventPageProps;

const EventPage = (props) => {
  return (
    <div className='w-full'>
      <main className='flex'>
        <Sidebar />
        <Event event={props.event} />
      </main>
    </div>
  );
};

export default EventPage;
