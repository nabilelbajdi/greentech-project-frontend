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
    <div
      className='flex w-full'
      aria-placeholder='DD/MM/YYYY och hh/mm'
      aria-label='Välj datum och tid'
    >
      <DatePicker
        label={datumText}
        onChange={(date) => setSelectedDate(date)}
        className='w-full'
        format='DD/MM/YYYY'
        defaultValue={dateValue ? dayjs(dateValue) : null}
      />
      <TimePicker
        label={tidText}
        ampm={false}
        onChange={(time) => setSelectedTime(time)}
        className='w-full'
        defaultValue={timeValue ? dayjs(dateValue + 'T' + timeValue) : null}
      />
    </div>
  );
};

export default Calendar;
