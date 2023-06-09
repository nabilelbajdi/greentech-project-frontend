import Button from '@/components/Button';
import getGroupPageProps from '@/utils/getGroupPageProps';
import { useState } from 'react';
import PaginationPage from '@/components/PaginationPage';
import Widget from '@/components/Widget';
import Image from 'next/image';
import ModalCreator from '@/components/ModalCreator';
export const getServerSideProps = getGroupPageProps;

const GroupPage = (props) => {
  const [newGroup, setNewGroup] = useState(false);

  return (
    <div className='w-full'>
      <main className='flex'>
        <div className='lg:ml-28 bg-white rounded-xl overflow-hidden w-full'>
          <div className='rounded-xl overflow-hidden'>
            <div className='w-full h-auto mt-4 m-auto rounded-xl overflow-hidden'>
              <Image
                src='https://img.freepik.com/free-vector/portrait-young-employee-team_74855-7822.jpg?w=1800&t=st=1686152077~exp=1686152677~hmac=815ab13d835f4f1fba8559c9476a8e87b3d3f86411ca358740c81b4539120c57'
                alt='gruppbild'
                priority
                height={400}
                width={600}
                className='h-full w-auto m-auto'
              />
            </div>
            <div className='p-8 flex flex-col gap-6 border-b-2'>
              <p>
                Låt oss ta ansvar för att bevara våra skogar och vatten, skydda
                våra hotade arter och förvalta våra naturresurser på ett
                hållbart sätt. Låt oss vara förebilder för resten av världen när
                det gäller miljövänlighet och ekologiskt medvetande.
              </p>
              <p>
                Tillsammans kan vi skapa en framtid där naturen blomstrar, där
                människor lever i harmoni med sitt omgivande ekosystem och där
                vår planet är trygg för kommande generationer att utforska och
                njuta av. Låt oss vara den förändring vi önskar se i världen och
                låt vår kärlek till miljön vara vår inspiration och drivkraft.
              </p>
              <p>
                Städa parker, håll föredrag, skapa ett evenemang och ta steget
                mot en bättre värld!
              </p>
              <Button
                title='Skapa ny grupp'
                callback={() => setNewGroup(!newGroup)}
              />
            </div>
          </div>
          <div className='p-8 border-b-2'>
            <PaginationPage
              length={props.groupsLength}
              title='Gå med i andra användares grupper'
              typeOfItem='group'
            />
          </div>
        </div>
        <Widget />
      </main>
      {newGroup && (
        <ModalCreator
          setNewItem={setNewGroup}
          item={props.group}
          typeOfItem='group'
        />
      )}
    </div>
  );
};

export default GroupPage;
