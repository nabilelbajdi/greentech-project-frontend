import { DatePicker, TimePicker } from '@mui/x-date-pickers';

const Calendar = ({ datumText, tidText, setSelectedDate, setSelectedTime }) => {
  return (
    <div className='flex w-full'>
      <DatePicker
        label={datumText}
        onChange={(date) => (setSelectedDate(date), console.log(date))}
        className='w-full'
        format='DD/MM/YYYY'
      />
      <TimePicker
        label={tidText}
        ampm={false}
        onChange={(time) => (setSelectedTime(time), console.log(time))}
        className='w-full'
      />
    </div>
  );
};

export default Calendar;
