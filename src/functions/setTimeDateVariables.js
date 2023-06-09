import { getWeekName, getMonthName } from '@/functions/daysAndMonths';

export const setTimeDateVariables = (item) => {
  const timeDate = {
    startTime: item.start_time,
    startDate: new Date(item.start_date),
    sDay: null,
    sMonth: null,
    sDate: null,
    sYear: null,
    endDate: null,
    eDay: null,
    eMonth: null,
    eDate: null,
    eYear: null,
    endTime: null,
  };

  timeDate.sDay = getWeekName(timeDate.startDate.getDay());
  timeDate.sMonth = getMonthName(timeDate.startDate.getMonth());
  timeDate.sDate = timeDate.startDate.getUTCDate();
  timeDate.sYear = timeDate.startDate.getFullYear();

  if (item.end_date) {
    timeDate.endDate = new Date(item.end_date);
    timeDate.eDay = getWeekName(timeDate.endDate.getDay());
    timeDate.eMonth = getMonthName(timeDate.endDate.getMonth());
    timeDate.eDate = timeDate.endDate.getUTCDate();
    timeDate.eYear = timeDate.endDate.getFullYear();
    timeDate.endTime = item.end_time;
  }

  return timeDate;
};
