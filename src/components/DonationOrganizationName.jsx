import DonationOrganization from './DonationOrganization';
import { organization } from '@/utils/organizations';

const DonationOrganizationName = ({ org }) => {
  return (
    <div className='flex items-center justify-center w-full'>
      <DonationOrganization
        logoLink={organization[org].logoLink}
        logoImg={organization[org].logoImg}
        props={organization[org].props}
      />
    </div>
  );
};

export default DonationOrganizationName;
