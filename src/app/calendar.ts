import Calendar from 'react-calendar';
import styled from 'styled-components';

export const StyledCalendar = styled(Calendar)`
  /* 컴포넌트 전체에 적용되는 스타일 */
  &.react-calendar {
    margin: 50px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  abbr[title] {
    text-decoration: none;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__navigation button {
    font-size: 18px;
  }
  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__month-view__weekdays__weekday {
    font-size: 14px;

    /* 타일 스타일 커스텀 */
    border-radius: 10px;

    abbr {
      font-weight: 300;
      text-decoration: none;
    }
  }
  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__month-view__days__day {
    padding: 13px;
    font-size: 15px;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: transparent;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: transparent;
  }

  //오늘날짜
  .react-calendar__tile--now {
    background-color: transparent;

    abbr {
      padding: 1px 7px;
      background-color: #ffff76;
    }
  }

  .react-calendar__tile--active {
    color: #fff;
    background: transparent;

    abbr {
      padding: 1px 7px;
      color: #fff;
      background: #006edc;
      border-radius: 20%;
    }
  }

  .react-calendar__navigation {
    button:enabled:focus {
      background: transparent;
    }
  }
  /* stylelint-disable-next-line no-duplicate-selectors */
  /* stylelint-disable-next-line selector-class-pattern */
  .react-calendar__month-view__days__day {
    position: relative;
    width: 40px;
    height: 40px;
    padding: 3px;

    .dot {
      position: absolute;
      bottom: -3px;
      left: 50%;
      font-size: 8px;
      color: #2e2b2b;
      transform: translate(-50%, 0);
    }
  }
`;
