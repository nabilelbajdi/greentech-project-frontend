import { setTimeDateVariables } from '@/functions/setTimeDateVariables';
import Map from './Map';
import Button from './Button';
import dayjs from 'dayjs';

const ItemInformation = ({ item, btnTitle, itemType }) => {
  const timeDate = setTimeDateVariables(item);
  return (
    <div className='bg-white p-4 rounded-xl flex flex-col'>
      <div
        className={`grid ${
          item.address ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
        } lg:flex-row flex-col justify-between mb-4`}
      >
        <div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl font-semibold sm:text-center'>
              {itemType === 'donation' ? 'Upphämtning' : 'Information'}
            </h2>
            <p>
              {itemType === 'donation'
                ? `Doneras av: ${item.user.firstName} ${item.user.lastName}`
                : `Admin: ${item.admin.firstName} ${item.admin.lastName}`}
            </p>
            {item.start_date !== '' && item.start_date !== 'Invalid Date' && (
              <p>
                Datum: {timeDate.sDate}/{dayjs(timeDate.startDate).format('M')}{' '}
                {timeDate.eDate &&
                  `- ${timeDate.eDate}/${timeDate.endDate.getMonth()}`}
              </p>
            )}
            {item.start_time !== '' && item.start_time && (
              <p>
                Tid: {timeDate.startTime}{' '}
                {timeDate.endTime && `- ${timeDate.endTime}`}
              </p>
            )}
            <p>{item.address && `Address: ${item.address}`}</p>
          </div>
          {itemType !== 'donation' && (
            <p className='mt-4'>{item.description}</p>
          )}
        </div>
        {item.address && (
          <div className='h-fit lg:w-96 w-full rounded-xl lg:mt-0 mt-4 ml-auto bg-gray-100'>
            <Map
              selected={{
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lng),
              }}
              height='h-96'
              width='w-full'
              search={false}
            />
          </div>
        )}
      </div>
      {/* add functionality */}
      {itemType !== 'donation' && <Button title={btnTitle} />}
    </div>
  );
};

export default ItemInformation;
