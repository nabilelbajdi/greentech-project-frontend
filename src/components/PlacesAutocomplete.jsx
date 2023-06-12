import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import { useEffect } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

const PlacesAutocomplete = ({
  setSelected,
  placeholder,
  setAddress,
  address,
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {
    setValue(address);
  }, []);

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    setAddress(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox
      onSelect={handleSelect}
      role='combobox'
      aria-haspopup='listbox'
      aria-autocomplete='list'
    >
      <ComboboxInput
        value={value ? value : ''}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className='px-2 py-4 border-2 rounded-lg w-full'
        placeholder={placeholder}
      />
      <ComboboxPopover className='z-50'>
        <ComboboxList
          className='bg-white text-black p-2 z-20'
          role='listbox'
          aria-labelledby='Address'
        >
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                key={place_id}
                value={description}
                className='border-b-2 hover:bg-slate-200 cursor-pointer'
                role='option'
                aria-selected
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutocomplete;
