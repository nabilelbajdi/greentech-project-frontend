import getProps from '@/utils/getProps';
export const getServerSideProps = getProps;

import Map from '@/components/Map';
const Maps = () => {
  const places = ['places'];
  return (
    <Map places={places} placeholder={'plats'} height='screen' width='screen' />
  );
};
export default Maps;
