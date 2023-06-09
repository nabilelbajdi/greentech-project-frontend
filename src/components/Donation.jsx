import { useRouter } from 'next/router';
import { useState } from 'react';
import ModalCreator from './ModalCreator';
import Item from './Item';

const DonationInfo = ({ donation }) => {
  const [edit, setEdit] = useState(false);
  const { push } = useRouter();
  const imagePlaceholder =
    'https://img.freepik.com/free-vector/volunteers-packing-donation-boxes_74855-5299.jpg?w=2000&t=st=1686327711~exp=1686328311~hmac=71c46c36c286de092735e84d3c70e8077107177a674e6bbf513827910a2e4558';

  return (
    <section className='relative p-4 w-full bg-gray-100 rounded-xl'>
      <Item
        item={donation}
        imagePlaceholder={imagePlaceholder}
        itemType='donation'
        setEdit={setEdit}
        push={push}
      />
      {edit && (
        <ModalCreator
          setNewItem={setEdit}
          item={donation}
          typeOfItem='donation'
          edit={true}
        />
      )}
    </section>
  );
};

export default DonationInfo;
