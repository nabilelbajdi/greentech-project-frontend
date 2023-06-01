import DonationInfo from '@/components/DonationInfo';
import getDonationSlugPageProps from '@/utils/getDonationSlugPageProps';
export const getServerSideProps = getDonationSlugPageProps;

const DonationPage = (props) => {
  return (
    <div className='w-full'>
      <main className='flex'>
        {props.donation ? (
          <>
            <DonationInfo donation={props.donation} />
          </>
        ) : (
          <h1>Donationen existerar inte</h1>
        )}
      </main>
    </div>
  );
};

export default DonationPage;
