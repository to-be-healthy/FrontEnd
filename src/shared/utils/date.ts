import dayjs from 'dayjs';

const getStartOfWeek = (date?: Date) => {
  return dayjs(date).subtract(1, 'days').startOf('week').add(1, 'days').toDate();
};

/**
 * @description "12:30"과 같은 포맷의 시간을 12.5와 같은 Number로 변환
 */
const timeToDecimal = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours + minutes / 60;
};

export { getStartOfWeek, timeToDecimal };
