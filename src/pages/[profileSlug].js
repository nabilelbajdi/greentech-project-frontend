import Posts from '@/components/Posts';
import ProfileCard from '@/components/ProfileCard';
import getProfilePageProps from '@/utils/getProfilePageProps';
export const getServerSideProps = getProfilePageProps;

const EventPage = (props) => {
  return (
    <div className='w-full'>
      <main className='flex flex-col'>
        {props.user ? (
          <div className='flex px-10'>
            <div>
              <ProfileCard user={props.user} />
              <Posts posts={props.user.posts} />
            </div>
          </div>
        ) : (
          <h1>Användaren hittades inte</h1>
        )}
      </main>
    </div>
  );
};

export default EventPage;
