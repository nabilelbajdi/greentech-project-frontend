import getProps from '@/utils/getProps';
export const getServerSideProps = getProps;

import Map from '@/components/Map';
const Maps = () => {
  const places = ['places'];
  return <Map places={places} />;
};
export default Maps;
