import timeAgo from '@/functions/timeAgo';
import { useEffect, useState } from 'react';

const TimeStamp = ({ time }) => {
  const [timeStamp, setTimeStamp] = useState('');

  useEffect(() => {
    setTimeStamp(timeAgo(time.toString()));
  }, []);

  return <p className='text-xs'>{timeStamp}</p>;
};

export default TimeStamp;
