import Image from 'next/image';
import DonationOrganizationItem from './DonationOrganizationItem';

const DonationOrganizationName = ({ org }) => {
  const organization = {
    wwf: (
      <>
        <Image
          src='https://www.wwf.se/app/themes/wwf/assets/img/logo.svg'
          alt='organisationslogga'
          height={60}
          width={60}
          className='border-2 bg-white h-full w-60 p-4'
        />
        <div className='flex justify-center gap-4 overflow-x-scroll h-full w-full'>
          <DonationOrganizationItem
            img='https://wwwwwfse.cdn.triggerfish.cloud/uploads/2020/12/top-regnskog-shutterstock-1600x800.webp'
            title='Plantera träd i regnskogen'
            link='https://www.wwf.se/stod/bli-fadder/regnskogsfadder/#bli-fadder'
          />
          <DonationOrganizationItem
            img='https://wwwwwfse.cdn.triggerfish.cloud/uploads/2022/01/original_ww1155960-1600x1046.webp'
            title='Bli tigerfadder'
            link='https://www.wwf.se/stod/bli-fadder/tigerfadder/#bli-fadder'
          />
          <DonationOrganizationItem
            img='https://wwwwwfse.cdn.triggerfish.cloud/uploads/2022/11/hero-elefant-jul2022-nedtonad-1600x800.webp'
            title='Ge en gåva till WWF'
            link='https://www.wwf.se/stod/ge-en-gava/'
          />
        </div>
      </>
    ),
    rodaKorset: (
      <>
        <Image
          src='https://i0.wp.com/www.orebronyheter.com/wp-content/uploads/2019/04/roda-korset-logo.jpg?w=420&ssl=1'
          alt='organisationslogga'
          height={60}
          width={60}
          className='border-2 bg-white h-full w-60 p-4'
        />
        <div className='flex justify-center gap-4 overflow-x-scroll h-full w-full'>
          <DonationOrganizationItem
            img='https://www.rodakorset.se/globalassets/rodakorset.se/bilder/var-varld/har-arbetar-vi/somalia/mohamad-plumpynut-somalia-2000x1125?width=2100&mode=crop&heightratio=0.667&quality=85'
            title='Bli månadsgivare'
            link='https://www.rodakorset.se/stod-oss/bli-manadsgivare/bli-manadsgivare-2/'
          />
          <DonationOrganizationItem
            img='https://www.rodakorset.se/globalassets/rodakorset.se/bilder/2-engagera-dig/af036a7355c7402094952bace6c4a680.jpg?center=0.42,0.96&format=webp&width=2100&mode=crop&heightratio=0.667&quality=85'
            title='Bli voluntär, du behövs!'
            link='https://www.rodakorset.se/engagera-dig/'
          />
          <DonationOrganizationItem
            img='https://www.rodakorset.se/globalassets/rodakorset.se/bilder/1-stod-oss/produktbilder/hero-kollektion/katastrofpaket-hogtid-puff-1000x750.jpg?autorotate=true&mode=crop&center=0.56,0.51&width=1600&heightratio=0.667&quality=85'
            title='Presenter som räddar liv'
            link='https://www.rodakorset.se/stod-oss/gavoshop/'
          />
        </div>
      </>
    ),
  };
  return (
    <div className='flex items-center h-60 bg-chas-gradient-primary bg-opacity-75 w-full'>
      {organization[org]}
    </div>
  );
};

export default DonationOrganizationName;
