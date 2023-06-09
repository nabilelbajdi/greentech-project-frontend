import { CalendarIcon } from '@heroicons/react/solid';
import { setTimeDateVariables } from '@/functions/setTimeDateVariables';

const ItemTimeDate = ({ item }) => {
  const timeDate = setTimeDateVariables(item);

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex items-center gap-2'>
          <CalendarIcon className='h-10 w-10' />
          <div className='flex flex-col'>
            <p className='font-bold text-lg'>
              {item.start_date !== '' &&
                `${timeDate.sDay} ${timeDate.sDate} ${timeDate.sMonth} ${timeDate.sYear}`}{' '}
              {item.start_time !== '' &&
                item.start_time &&
                `Kl: ${timeDate.startTime}`}{' '}
              {item.end_date &&
                `- ${timeDate.eDay} ${timeDate.eDate} ${timeDate.eMonth} ${timeDate.eYear}`}{' '}
              {item.end_time !== '' &&
                item.end_time &&
                `Kl ${timeDate.endTime}`}
            </p>
          </div>
        </div>
        <p>{item.address}</p>
      </div>
    </>
  );
};

export default ItemTimeDate;
