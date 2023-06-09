import getGroupSlugPageProps from '@/utils/getGroupSlugPageProps';
import Widget from '@/components/Widget';
import Group from '@/components/Group';
export const getServerSideProps = getGroupSlugPageProps;

const GroupPage = (props) => {
  return (
    <div className='w-full'>
      <main className='flex'>
        {props.group ? (
          <>
            <div className='lg:ml-28 w-full'>
              <Group group={props.group} />
            </div>
            <Widget />
          </>
        ) : (
          <h1>Gruppen existerar inte</h1>
        )}
      </main>
    </div>
  );
};

export default GroupPage;
