import Posts from '@/components/Posts';
import ProfileCard from '@/components/ProfileCard';
import getProfilePageProps from '@/utils/getProfilePageProps';
import Link from 'next/link';
export const getServerSideProps = getProfilePageProps;
import Gallery from '@/components/Gallery';

const EventPage = (props) => {
  return (
    <div className='w-full'>
      <main className='flex flex-col'>
        {props.user ? (
          <div className='flex px-10'>
            <div className='mr-20'>
              <h2 className='border-b-2 border-black'>Evenenemang</h2>
              {props.user.eventsCreated.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <div className='flex items-center justify-center bg-white rounded-xl h-20 w-60 my-4'>
                    {event.name}
                  </div>
                </Link>
              ))}
            </div>
            <div>
              <ProfileCard user={props.user} />
              <Posts posts={props.user.posts} />
            </div>
            <Gallery images={props.user.images} size={12} />
          </div>
        ) : (
          <h1>Användaren hittades inte</h1>
        )}
      </main>
    </div>
  );
};

export default EventPage;
