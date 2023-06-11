import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import Calendar from './Calendar';
import Map from './Map';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const ModalCreator = ({
  setNewItem,
  item,
  typeOfItem,
  edit,
  showTime,
  showEndTime,
}) => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const itemName = useRef();
  const description = useRef();
  const category = useRef(null);
  const [errorMessage, setErrorMessage] = useState();
  const condition = useRef(null);
  const imageRef = useRef(null);
  const [uploadImages, setUploadImages] = useState();
  const [enableEndTime, setEnableEndTime] = useState(
    edit && item.end_date !== null ? item.end_date : null
  );
  const [startDate, setStartDate] = useState(edit && item.start_date);
  const [endDate, setEndDate] = useState(
    edit && item.end_date && item.end_date
  );
  const [startTime, setStartTime] = useState(edit && item.start_time);
  const [endTime, setEndTime] = useState(edit && item.end_time);
  const [selected, setSelected] = useState(
    edit
      ? {
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lng),
        }
      : {
          lat: '',
          lng: '',
        }
  );
  const [address, setAddress] = useState(edit ? item.address : '');
  const [enableAddress, setEnableAddress] = useState(address);
  const [enableDateTime, setEnableDateTime] = useState(startDate || startTime);
  const type = {
    group: 'Grupp',
    event: 'Evenemang',
    donation: 'Donation',
  };
  const [titleType, setTitleType] = useState(type[typeOfItem].toLowerCase());
  console.log(type[typeOfItem]);

  if (edit) {
    useEffect(() => {
      itemName.current.value = item.name;
      description.current.value = item.description;
      if (typeOfItem === 'donation') {
        category.current.value = item.category;
        condition.current.value = item.condition;
      }
    }, []);
  }

  const createItem = async () => {
    let image;
    if (uploadImages) {
      image = await handleUploadImages();
      if (image instanceof Error) {
        return;
      }
    }

    const itemInfo = {
      name: itemName.current.value,
      image: uploadImages && image[0],
      startDate:
        enableDateTime && startDate
          ? dayjs(startDate).format('YYYY-MM-DD')
          : '',
      startTime: enableDateTime
        ? edit && startTime['$d'] === undefined
          ? startTime.slice(-5)
          : edit
          ? dayjs(startTime).format('HH:mm')
          : startTime
          ? dayjs(startTime).format('HH:mm')
          : null
        : '',
      endDate: enableDateTime
        ? enableEndTime && endDate
          ? dayjs(endDate).format('YYYY-MM-DD')
          : null
        : '',
      endTime:
        enableDateTime && enableEndTime
          ? edit && endTime['$d'] === undefined
            ? endTime.slice(-5)
            : edit
            ? dayjs(endTime).format('HH:mm')
            : endTime
            ? dayjs(endTime).format('HH:mm')
            : null
          : '',

      // enableDateTime
      //   ? enableEndTime && endTime !== null
      //     ? edit && endTime['$d']
      //       ? endTime.slice(-5)
      //       : edit
      //       ? dayjs(endTime).format('HH:mm')
      //       : endTime
      //       ? dayjs(endTime).format('HH:mm')
      //       : null
      //     : null
      //   : '',
      address: enableAddress
        ? address
          ? address.formatted_address
          : null
        : '',
      lat: enableAddress ? selected.lat.toString() : '',
      lng: enableAddress ? selected.lng.toString() : '',
      description: description.current.value,
      category: typeOfItem === 'donation' ? category.current.value : null,
      condition: typeOfItem === 'donation' ? condition.current.value : null,
    };

    let response;
    if (edit) {
      response = await fetch(`/api/prisma/${typeOfItem}s/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemInfo }),
      });
    } else {
      response = await fetch(`/api/prisma/${typeOfItem}s`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemInfo }),
      });
    }

    const data = await response.json();
    console.log('data: ', data);
    push(`/${typeOfItem}s/${data.id}`);
    setNewItem(false);
  };

  const handleSubmit = (e) => {
    createItem();

    e.preventDefault();
  };

  const handleUploadImages = async () => {
    const form = new FormData();

    uploadImages.forEach((image) => {
      form.append('images', image);
    });

    const response = await fetch('/api/images', {
      method: 'POST',
      body: form,
    });

    if (response.ok) {
      return await response.json();
    } else {
      //console.log(await response.text());
      setErrorMessage(await response.text());
      return new Error();
    }
  };

  return (
    <div
      className='fixed top-0 left-0 flex flex-col items-center justify-center lg:p-10 h-screen w-screen z-50 bg-gray-900 bg-opacity-60'
      onClick={(e) => (setNewItem(false), e.stopPropagation())}
    >
      <form
        className='flex flex-col rounded-lg items-center lg:h-full lg:w-1/2 w-screen h-screen bg-white overflow-y-scroll'
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleSubmit(e)}
      >
        <button
          className='absolute top-4 right-4 lg:hidden h-10 w-10'
          onClick={() => setNewItem(false)}
        >
          X
        </button>
        <h1 className='border-b-2 mt-4 w-full pb-4 text-center text-xl font-bold'>
          {edit
            ? `Uppdatera ${titleType.toLowerCase()}`
            : `Skapa ${titleType.toLowerCase()}`}
        </h1>
        {/* Image upload goes here */}
        <div className='relative h-68 w-full bg-gray-200'>
          {uploadImages ? (
            <Image
              src={URL.createObjectURL(uploadImages[0])}
              alt={`${titleType}sbild`}
              height={300}
              width={500}
              className='w-full h-full'
            />
          ) : (
            <Image
              src='https://img.freepik.com/free-vector/employee-marking-deadline-day-man-with-pencil-appointing-date-event-making-note-calendar-vector-illustration-schedule-agenda-time-management_74855-8347.jpg?w=2000&t=st=1684247023~exp=1684247623~hmac=908c558882f8adbb9fff5091df11cf306db9cf59aecebece9d18b2ca83de6110'
              alt={`${titleType}sbild`}
              height={300}
              width={500}
              className='w-full h-full'
            />
          )}

          <button
            className='absolute bottom-4 right-8 p-2 bg-gray-300 rounded-xl hover:bg-green-500'
            type='button'
            onClick={() => {
              imageRef.current.click();
              setErrorMessage();
            }}
          >
            Lägg till omslagsfoto
          </button>

          <input
            ref={imageRef}
            type='file'
            id='image'
            name='image'
            accept='image/png, image/jpeg, image/webp'
            onChange={(e) => {
              setUploadImages([...e.target.files]);
            }}
            hidden
          />
        </div>
        <div className='flex flex-col justify-start gap-4 p-4 w-full'>
          {/* Admin picture and name for event */}
          <div className='flex gap-4 items-center'>
            <Image
              src={session.user.image}
              alt='Användarens profilbild'
              width={40}
              height={40}
              className='rounded-full'
            />
            <div>
              <p className='font-semibold'>{session.user.name}</p>
              <p className=' text-sm'>Värd</p>
            </div>
          </div>
          {/* Name */}
          <input
            type='text'
            placeholder={
              typeOfItem === 'donation' ? 'Titel' : `Namn på ${titleType}`
            }
            className='px-2 py-4 border-2 rounded-lg'
            ref={itemName}
          />

          {typeOfItem === 'donation' && (
            <div className='flex items-center justify-center gap-10 px-4'>
              <div className='flex flex-col w-full'>
                <label htmlFor='category'>Kategori</label>
                <select id='category' required ref={category}>
                  <option value='Kläder'>Kläder</option>
                  <option value='Leksaker'>Leksaker</option>
                  <option value='Möbler'>Möbler</option>
                  <option value='Inredning'>Inredning</option>
                  <option value='Fordon'>Fordon</option>
                </select>
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='condition'>Skick</label>
                <select id='condition' required ref={condition}>
                  <option value='Ny'>Ny</option>
                  <option value='Använd fåtal gånger'>
                    Använd fåtal gånger (1-3)
                  </option>
                  <option value='Använd'>Använd</option>
                  <option value='Sliten'>Sliten</option>
                </select>
              </div>
            </div>
          )}

          {/* Date & time */}
          {/* Adds date & time options when creating the modal */}
          {showTime && (
            <>
              <div className='flex gap-4'>
                <input
                  type='checkbox'
                  value={enableDateTime}
                  id='enableDateTime'
                  onChange={() => setEnableDateTime(!enableDateTime)}
                  defaultChecked={startDate || startTime}
                />
                <label htmlFor='enableDateTime'>
                  Vill du lägga till datum & tid?
                </label>
              </div>

              {enableDateTime && (
                <div className='flex flex-col items-start gap-2 w-full'>
                  <Calendar
                    datumText={'Startdatum'}
                    tidText={'Starttid'}
                    setSelectedDate={setStartDate}
                    setSelectedTime={setStartTime}
                    dateValue={edit ? startDate : ''}
                    timeValue={edit ? startTime : ''}
                  />
                  {/* Adds enddate & endtime option when creating the modal */}
                  {showEndTime && (
                    <>
                      {enableEndTime ? (
                        <>
                          <Calendar
                            datumText={'SlutDatum'}
                            tidText={'Sluttid'}
                            setSelectedDate={setEndDate}
                            setSelectedTime={setEndTime}
                            dateValue={edit ? endDate : ''}
                            timeValue={edit ? endTime : ''}
                          />
                          <button
                            className='hover:text-green-500'
                            onClick={() => setEnableEndTime(false)}
                          >
                            - Ta bort slutdatum och tid
                          </button>
                        </>
                      ) : (
                        <button
                          className='hover:text-green-500'
                          onClick={() => setEnableEndTime(true)}
                        >
                          + Lägg till slutdatum och tid
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </>
          )}
          {/* Address & lat/lng */}
          <div>
            <div className='flex gap-4'>
              <input
                type='checkbox'
                value={enableAddress}
                id='enableAddress'
                onChange={() => setEnableAddress(!enableAddress)}
                defaultChecked={address}
              />
              <label htmlFor='enableAddress'>
                Vill du lägga till en address?
              </label>
            </div>
          </div>
          {enableAddress && (
            <Map
              placeholder={'Lägg till plats'}
              height='h-96'
              width='w-full'
              selected={selected}
              setSelected={setSelected}
              setAddress={setAddress}
              address={address !== null ? address : ''}
            />
          )}
          {/* Description text */}
          <textarea
            className='px-2 py-4 border-2 rounded-lg w-full h-60 resize-none'
            placeholder='Vad mer behöver man veta?'
            ref={description}
          />
        </div>
        <div className='sticky z-10 bottom-0 w-full bg-white-200 p-1'>
          {errorMessage ? (
            <div className='text-red-500'>Error: {errorMessage}</div>
          ) : null}
          <button className='p-4 bg-chas-gradient-primary rounded-xl w-full hover:bg-chas-gradient-secondary text-white'>
            {edit ? `Uppdatera ${titleType}` : `Skapa ${titleType}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalCreator;

ModalCreator.defaultProps = {
  typeOfItem: 'event',
  showTime: true,
  showEndTime: false,
};
