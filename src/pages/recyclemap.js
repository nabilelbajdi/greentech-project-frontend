import getProps from '@/utils/getProps';
export const getServerSideProps = getProps;

import Map from '@/components/Map';
import Recycle from '@/components/Recycle';
const Maps = () => {
  const places = ['places'];
  return (
    <div className='w-screen h-screen'>
      <Recycle />
    </div>
    // <Map places={places} placeholder={'plats'} height='screen' width='screen' />
  );
};
export default Maps;
