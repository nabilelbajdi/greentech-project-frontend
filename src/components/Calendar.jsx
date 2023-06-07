import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const Calendar = ({
  datumText,
  tidText,
  setSelectedDate,
  setSelectedTime,
  dateValue,
  timeValue,
}) => {
  return (
    <div className='flex w-full'>
      <DatePicker
        label={datumText}
        onChange={(date) => setSelectedDate(date)}
        className='w-full'
        format='DD/MM/YYYY'
        defaultValue={dayjs(dateValue)}
      />
      <TimePicker
        label={tidText}
        ampm={false}
        onChange={(time) => setSelectedTime(time)}
        className='w-full'
        defaultValue={dayjs(dateValue + 'T' + timeValue)}
      />
    </div>
  );
};

export default Calendar;
