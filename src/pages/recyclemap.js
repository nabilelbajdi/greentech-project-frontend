import getProps from '@/utils/getProps';
export const getServerSideProps = getProps;

import Map from '@/components/Map';
import Recycle from '@/components/Recycle';
const Maps = () => {
  const places = ['places'];
  return (
    <main className='w-screen h-screen'>
      <Recycle />
    </main>
    // <Map places={places} placeholder={'plats'} height='screen' width='screen' />
  );
};
export default Maps;
