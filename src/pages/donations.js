import Button from '@/components/Button';
import DonationCreator from '@/components/DonationCreator';
import DonationOrganizationName from '@/components/DonationOrganizationName';
import DonationOrganizationContainer from '@/components/DonationOrganizationsContainer';
import DonationPreview from '@/components/DonationPreview';
import getDonationPageProps from '@/utils/getDonationPageProps';
import Link from 'next/link';
import { useState } from 'react';
export const getServerSideProps = getDonationPageProps;

const DonationsPage = (props) => {
  const [newDonation, setNewDonation] = useState(false);
  return (
    <main className='flex flex-col gap-4 items-center justify-center p-2'>
      <Button
        title='Skapa ny donation'
        callback={() => setNewDonation(!newDonation)}
      />
      {newDonation && (
        <DonationCreator
          newDonation={newDonation}
          setNewDonation={setNewDonation}
        />
      )}
      <div className='mt-6 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-6'>
        {props.donations.map((donation) => (
          <Link href={`/donations/${donation.id}`} key={donation.id}>
            <DonationPreview donation={donation} />
          </Link>
        ))}
      </div>
      <div className='flex flex-col gap-6 w-full'>
        <DonationOrganizationName org='wwf' />
        <DonationOrganizationName org='rodaKorset' />
      </div>
    </main>
  );
};

export default DonationsPage;
