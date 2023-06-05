import DonationInfo from '@/components/DonationInfo';
import getDonationSlugPageProps from '@/utils/getDonationSlugPageProps';
export const getServerSideProps = getDonationSlugPageProps;
import Widget from '@/components/Widget';

const DonationPage = (props) => {
  return (
    <div className='w-full'>
      <main className='flex'>
        {props.donation ? (
          <>
            <div className='lg:ml-28 w-full'>
              <DonationInfo donation={props.donation} />
            </div>
            <Widget />
          </>
        ) : (
          <h1>Donationen existerar inte</h1>
        )}
      </main>
    </div>
  );
};

export default DonationPage;
