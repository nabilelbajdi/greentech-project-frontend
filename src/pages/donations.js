import Button from '@/components/Button';
import DonationOrganizationName from '@/components/DonationOrganizationName';
import getDonationPageProps from '@/utils/getDonationPageProps';
import { useState } from 'react';
import Widget from '@/components/Widget';
import Image from 'next/image';
import PaginationPage from '@/components/PaginationPage';
import ModalCreator from '@/components/ModalCreator';
export const getServerSideProps = getDonationPageProps;

const DonationsPage = (props) => {
  const [newDonation, setNewDonation] = useState(false);
  // const [category, setCategory] = useState('Kläder');

  return (
    <div className='w-full'>
      <main className='flex'>
        <div className='lg:ml-28 bg-white rounded-xl overflow-hidden w-full'>
          <div className='rounded-xl overflow-hidden'>
            <div className='w-fit h-auto mt-4 m-auto rounded-xl overflow-hidden'>
              <Image
                src='https://img.freepik.com/free-vector/people-carrying-donation-charity-related-icons_53876-43091.jpg?w=1800&t=st=1686152257~exp=1686152857~hmac=ef90dcd9ea3e4a4d2ff28d05223afb776986884b351a4f2c3022cab74f66a55a'
                alt='donationsbild'
                priority
                height={300}
                width={500}
                className='w-full h-auto'
              />
            </div>
            <div className='p-8 flex flex-col gap-6 border-b-2'>
              <p>
                Organisationer är en viktig drivkraft för att skapa positiv
                förändring i samhället och för att skydda miljön.
              </p>
              <p>
                Genom att donera till organisationer, eller donera bort sånt du
                inte längre behöver, kan vi tillsammans hjälpas åt att skapa en
                mer hållbar värld.
              </p>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col p-8 gap-4'>
              <p className='font-bold text-2xl'>Donera dina artiklar</p>
              <Image
                src='https://img.freepik.com/free-vector/recycle-colorful-geometric-gradient-logo-vector_343694-1249.jpg?w=1380&t=st=1685987662~exp=1685988262~hmac=bc4bbdf8a593bb5cddf6cea365d5bfeb69e3f457a324e571be6dbef4a2487786'
                alt='återvinningssymbol'
                height={200}
                width={200}
              />
            </div>
            <div className='flex flex-col gap-6 p-8'>
              <p>
                Genom att donera dina artiklar bidrar du till att hjälpa
                människor i behov och minska miljöpåverkan.
              </p>
              <p>
                Ge bort kläder, möbler och andra varor istället för att kasta
                dem. På så sätt kan du hjälpa till att minska avfallsmängden och
                hålla planeten renare.
              </p>

              <Button
                title='Skapa ny donation'
                callback={() => setNewDonation(!newDonation)}
              />
            </div>
          </div>
          <div className='p-8 border-b-2'>
            <PaginationPage
              length={props.donationsLength}
              title='Se vad andra användare donerar bort just nu!'
              typeOfItem='donation'
            />
          </div>
          <div className='flex items-center justify-center p-8'>
            <div className='flex flex-col items-center justify-center mt-6 gap-6 w-full'>
              <p className='font-bold text-2xl'>
                Donera till andra organisationer
              </p>
              <DonationOrganizationName org='wwf' />
              <DonationOrganizationName org='rodaKorset' />
            </div>
          </div>
        </div>
        <Widget />
      </main>
      {newDonation && (
        <ModalCreator setNewItem={setNewDonation} typeOfItem='donation' />
      )}
    </div>
  );
};

export default DonationsPage;
