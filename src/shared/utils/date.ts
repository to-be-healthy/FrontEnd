import dayjs from 'dayjs';

const getStartOfWeek = (date?: Date | string) => {
  return dayjs(date).subtract(1, 'days').startOf('week').add(1, 'days').toDate();
};

/**
 * @param target 비교하려고 하는 시간
 * @param criteria (선택) 기준 시간, 입력하지 않으면 현재 시간 기준
 * @description 현재 시간을 기준으로 얼마나 시간이 흘렀는지 반환
 */
const formatTimestampToRelativeTime = (
  target: Date | string,
  criteria?: Date | string
) => {
  const now = dayjs(criteria);
  const time = dayjs(target);

  const diffInSeconds = now.diff(time, 'second');
  const diffInMinutes = now.diff(time, 'minute');
  const diffInHours = now.diff(time, 'hour');

  if (diffInSeconds < 0) {
    const futureDiffInSeconds = Math.abs(diffInSeconds);
    const futureDiffInMinutes = Math.abs(diffInMinutes);
    const futureDiffInHours = Math.abs(diffInHours);

    if (futureDiffInSeconds < 60) {
      return `${futureDiffInSeconds}초 후`;
    } else if (futureDiffInMinutes < 60) {
      return `${futureDiffInMinutes}분 후`;
    } else {
      return `${futureDiffInHours}시간 후`;
    }
  } else {
    if (diffInSeconds < 60) {
      return `${diffInSeconds}초 전`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else {
      return `${diffInHours}시간 전`;
    }
  }
};

/**
 * @description "12:30"과 같은 포맷의 시간을 12.5와 같은 Number로 변환
 */
const timeToDecimal = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours + minutes / 60;
};

/**
 * @description 24시간 형식을 12시간형식으로 변환
 */

const convertTo12HourFormat = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hourNumber = Number(hours);

  const period = hourNumber < 12 ? '오전' : '오후';
  const hour = hourNumber % 12 || 12;

  return [`${hour}:${minutes}`, period];
};

export {
  convertTo12HourFormat,
  formatTimestampToRelativeTime,
  getStartOfWeek,
  timeToDecimal,
};
