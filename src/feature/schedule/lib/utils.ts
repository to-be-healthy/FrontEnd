import dayjs from 'dayjs';

const getStartOfWeek = (date?: Date) => {
  return dayjs(date).subtract(1, 'days').startOf('week').add(1, 'days').toDate();
};

export { getStartOfWeek };
