export const getMonthName = (month) => {
  const month_names = [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'July',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ];

  return month_names[month];
};

export const getWeekName = (day) => {
  const week_name = [
    'Söndag',
    'Måndag',
    'Tisdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lördag',
  ];

  return week_name[day];
};
