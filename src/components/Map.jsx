import { useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import PlacesAutocomplete from './PlacesAutocomplete';
import { places } from '@/utils/places';

export default function Map({
  width,
  height,
  placeholder,
  selected,
  setSelected,
  address,
  setAddress,
  search,
}) {
  const center = useMemo(() => ({ lat: 59.293051, lng: 18.07679 }), []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: places,
  });

  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullScreenControl: false,
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className='flex flex-col gap-6'>
      {search && (
        <PlacesAutocomplete
          setSelected={setSelected}
          placeholder={placeholder}
          setAddress={setAddress}
          address={address}
        />
      )}
      {selected && address !== '' && (
        <GoogleMap
          zoom={15}
          center={selected !== null ? selected : center}
          options={options}
          mapContainerClassName={`${height} ${width} rounded-xl`}
        >
          {selected && <MarkerF position={selected} />}
        </GoogleMap>
      )}
    </div>
  );
}

Map.defaultProps = {
  search: true,
};
