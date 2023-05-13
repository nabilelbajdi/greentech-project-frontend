import { useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import PlacesAutocomplete from './PlacesAutoconplete';

export default function Map({ places }) {
  const [selected, setSelected] = useState(null);
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
    <div>
      <PlacesAutocomplete setSelected={setSelected} />
      <GoogleMap
        zoom={15}
        center={selected !== null ? selected : center}
        options={options}
        mapContainerClassName='w-screen h-screen bg-slate-500'
      >
        {selected && (
          <MarkerF
            position={selected}
            onClick={(e) => {
              console.log(e.latLng.lat);
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
