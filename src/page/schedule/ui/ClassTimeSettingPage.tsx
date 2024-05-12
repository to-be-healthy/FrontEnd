'use client';
import 'swiper/css';
import './swiper.css';

import { useState } from 'react';

import { DayOfWeek, useTrainerClassTimeSettingMutation } from '@/feature/schedule';
import CheckIcon from '@/shared/assets/images/icon_check.svg';
import ErrorIcon from '@/shared/assets/images/icon_error.svg';
import NoCircleCheckIcon from '@/shared/assets/images/noCircleCheck.svg';
import { Typography } from '@/shared/mixin';
import { Button, Layout, Sheet, SheetContent, SheetTrigger, useToast } from '@/shared/ui';
import { TimeSwiper } from '@/shared/ui/time-swiper';
import { cn } from '@/shared/utils';

type TimeSettings = 'startTime' | 'endTime' | 'lunchStartTime' | 'lunchEndTime';
type Time = '30분' | '1시간' | '1시간 30분' | '2시간';
interface ClassTimeType {
  time: Time;
  name: 'HALF_HOUR' | 'ONE_HOUR' | 'ONE_AND_HALF_HOUR' | 'TWO_HOUR';
  checked: boolean;
}
interface TimeListType {
  name: TimeSettings;
  timePeriods: string;
  hours: string;
  minutes: string;
  state: boolean;
}

interface DayOfWeekType {
  eng: DayOfWeek;
  kor: string;
}
const dayOfWeek: DayOfWeekType[] = [
  { eng: 'MONDAY', kor: '월' },
  { eng: 'TUESDAY', kor: '화' },
  { eng: 'WEDNESDAY', kor: '수' },
  { eng: 'THURSDAY', kor: '목' },
  { eng: 'FRIDAY', kor: '금' },
  { eng: 'SATURDAY', kor: '토' },
  { eng: 'SUNDAY', kor: '일' },
];

const classTime: ClassTimeType[] = [
  { time: '30분', name: 'HALF_HOUR', checked: false },
  { time: '1시간', name: 'ONE_HOUR', checked: true },
  { time: '1시간 30분', name: 'ONE_AND_HALF_HOUR', checked: false },
  { time: '2시간', name: 'TWO_HOUR', checked: false },
];

const timePeriods = ['오전', '오후'];
const hours = Array.from({ length: 12 }, (_, i) => String(i + 1));
const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : String(i)));

export const ClassTimeSettingPage = () => {
  const [timeList, setTimeList] = useState<TimeListType[]>([
    { name: 'startTime', timePeriods: '오전', hours: '9', minutes: '00', state: false },
    { name: 'endTime', timePeriods: '오후', hours: '6', minutes: '00', state: false },
    {
      name: 'lunchStartTime',
      timePeriods: '오후',
      hours: '1',
      minutes: '00',
      state: false,
    },
    {
      name: 'lunchEndTime',
      timePeriods: '오후',
      hours: '2',
      minutes: '00',
      state: false,
    },
  ]);
  const [isLunchTimeUnset, setIsLunchTimeUnset] = useState(false); //점심시간 설정 체크 유무
  const [isClassTimeSheetOpen, setIsClassTimeSheetOpen] = useState(false); // 수업시간 sheet
  const [classTimeState, setClassTimeState] = useState(classTime); //수업시간
  const [dayOff, setDayOff] = useState<DayOfWeek[]>([]); //휴무일

  const { toast } = useToast();
  const { mutate } = useTrainerClassTimeSettingMutation();

  const formatTo24HourTime = (timeList: TimeListType) => {
    return timeList.timePeriods === '오후'
      ? `${Number(timeList.hours) + 12}:${timeList.minutes}`
      : Number(timeList.hours) < 10
        ? `0${timeList.hours}:${timeList.minutes}`
        : `${timeList.hours}:${timeList.minutes}`;
  };

  const handleSetClassTime = () => {
    const selectedClassTime = classTimeState.filter((item) => item.checked)[0].name;
    const selectedStartTime = formatTo24HourTime(timeList[0]);
    const selectedEndTime = formatTo24HourTime(timeList[1]);
    const selectedLunchStartTime = formatTo24HourTime(timeList[2]);
    const selectedLunchEndTime = formatTo24HourTime(timeList[3]);

    if (
      selectedClassTime &&
      selectedStartTime &&
      selectedEndTime &&
      selectedLunchStartTime &&
      selectedLunchEndTime
    ) {
      mutate(
        {
          startTime: selectedStartTime,
          endTime: selectedEndTime,
          lunchStartTime: selectedLunchStartTime,
          lunchEndTime: selectedLunchEndTime,
          closedDt: dayOff,
          sessionTime: selectedClassTime,
        },
        {
          onSuccess: ({ message }) => {
            toast({
              className: 'h-12',
              description: (
                <div className='flex items-center justify-center'>
                  <CheckIcon fill={'var(--primary-500)'} />
                  <p className='typography-heading-5 ml-6 text-[#fff]'>{message}</p>
                </div>
              ),
              duration: 2000,
            });
          },

          onError: (error) => {
            toast({
              className: 'py-5 px-6',
              description: (
                <div className='flex items-center justify-center'>
                  <ErrorIcon />
                  <p className='typography-heading-5 ml-6 text-[#fff]'>
                    {error.response?.data.message}
                  </p>
                </div>
              ),
              duration: 2000,
            });
          },
        }
      );
    }
  };

  const openTimePicker = (selectedTime: TimeSettings) => {
    setTimeList((prev) =>
      prev.map((item) => ({
        ...item,
        state: item.name === selectedTime,
      }))
    );
  };

  const changeSlide = (key: string, selectedValue: string, timeType: TimeSettings) => {
    setTimeList((prev) =>
      prev.map((item) => {
        return item.name === timeType
          ? {
              ...item,
              [key]: selectedValue,
            }
          : item;
      })
    );
  };

  const resetSettingsOnDisable = () => {
    setIsLunchTimeUnset((prev) => !prev);

    setTimeList((prev) =>
      prev.map((item) => {
        return (item.name === 'lunchStartTime' || item.name === 'lunchEndTime') &&
          item.state
          ? {
              ...item,
              state: false,
            }
          : item;
      })
    );
  };

  const selectedClassTime = (selectedTime: Time) => {
    const updatedTimes = classTimeState.map((item) => ({
      ...item,
      checked: item.time === selectedTime,
    }));
    setClassTimeState(updatedTimes);
    setIsClassTimeSheetOpen(false);
  };

  const selectedDayClick = (day: DayOfWeek) => {
    if (dayOff.includes(day)) {
      setDayOff(dayOff.filter((d) => d !== day));
    } else {
      setDayOff([...dayOff, day]);
    }
  };

  return (
    <Layout>
      <Layout.Header className='flex justify-end bg-[#fff]'>
        <Button
          variant='ghost'
          className={cn(Typography.BODY_1, 'p-0 text-gray-500')}
          onClick={handleSetClassTime}>
          건너뛰기
        </Button>
      </Layout.Header>
      <Layout.Contents className='flex flex-col justify-between bg-[#fff] px-7 pb-[30px] pt-[12px]'>
        <div>
          <article className='mb-[56px]'>
            <h2 className={cn(Typography.HEADING_1, 'mb-[12px] text-black')}>
              기본 수업 시간을
              <br />
              설정해주세요.
            </h2>
            <p className={cn(Typography.BODY_2, 'text-gray-600')}>
              기본 수업 시간은 내 스케줄에서
              <br />
              자유롭게 변경하실 수 있습니다.
            </p>
          </article>

          <article className='border-b border-solid border-gray-100 pb-[28px]'>
            <dl className='flex items-center justify-between'>
              <dt className={cn(Typography.TITLE_1_BOLD, 'text-black')}>근무 시간</dt>
              <dd>
                <Button
                  className={cn(
                    Typography.BODY_2,
                    'w-[89px] rounded-md bg-gray-100 py-4 text-black'
                  )}
                  onClick={() => openTimePicker('startTime')}>
                  {`${timeList[0].timePeriods} ${timeList[0].hours}:${timeList[0].minutes}`}
                </Button>
                <span className={cn(Typography.BODY_1, 'mx-1')}>~</span>
                <Button
                  className={cn(
                    Typography.BODY_2,
                    'w-[89px] rounded-md bg-gray-100 py-4 text-black'
                  )}
                  onClick={() => openTimePicker('endTime')}>
                  {`${timeList[1].timePeriods} ${timeList[1].hours}:${timeList[1].minutes}`}
                </Button>
              </dd>
            </dl>

            {timeList.map((timeSetting, idx) =>
              (timeSetting.name === 'startTime' && timeSetting.state) ||
              (timeSetting.name === 'endTime' && timeSetting.state) ? (
                <div
                  className='relative mt-[28px] flex items-center justify-center'
                  key={`${timeSetting.name}_${idx}`}>
                  <TimeSwiper
                    items={timePeriods}
                    loop={false}
                    initialSlide={timePeriods.indexOf(timeSetting.timePeriods)}
                    onSlideChange={(e) =>
                      changeSlide(
                        'timePeriods',
                        timePeriods[e.realIndex],
                        timeSetting.name
                      )
                    }
                    className='timeSwiper'
                  />
                  <TimeSwiper
                    items={hours}
                    initialSlide={hours.indexOf(timeSetting.hours)}
                    onSlideChange={(e) =>
                      changeSlide('hours', hours[e.realIndex], timeSetting.name)
                    }
                    className='timeSwiper'
                  />
                  <TimeSwiper
                    items={minutes}
                    initialSlide={minutes.indexOf(timeSetting.minutes)}
                    onSlideChange={(e) =>
                      changeSlide('minutes', minutes[e.realIndex], timeSetting.name)
                    }
                    className='timeSwiper'
                  />
                  <div className='absolute left-4 right-4 top-1/2 h-9 -translate-y-1/2 rounded-lg bg-[#f2f3f5] text-2xl'></div>
                </div>
              ) : null
            )}
          </article>

          <article className='border-b border-solid border-gray-100 py-[28px]'>
            <dl className='flex items-center justify-between'>
              <dt className={cn(Typography.TITLE_1_BOLD, 'text-black')}>점심 시간</dt>
              <dd className='flex flex-col items-end justify-end'>
                <div className='mb-5'>
                  <Button
                    className={cn(
                      Typography.BODY_2,
                      'w-[89px] rounded-md bg-gray-100 py-4 text-black disabled:bg-gray-100 disabled:text-gray-500'
                    )}
                    disabled={isLunchTimeUnset}
                    onClick={() => openTimePicker('lunchStartTime')}>
                    {`${timeList[2].timePeriods} ${timeList[2].hours}:${timeList[2].minutes}`}
                  </Button>
                  <span className={cn(Typography.BODY_1, 'mx-1')}>~</span>
                  <Button
                    className={cn(
                      Typography.BODY_2,
                      'w-[89px] rounded-md bg-gray-100 py-4 text-black disabled:bg-gray-100 disabled:text-gray-500'
                    )}
                    onClick={() => openTimePicker('lunchEndTime')}
                    disabled={isLunchTimeUnset}>
                    {`${timeList[3].timePeriods} ${timeList[3].hours}:${timeList[3].minutes}`}
                  </Button>
                </div>
                <div className='flex items-center justify-center'>
                  <span className={cn(Typography.BODY_2, 'mr-1 text-gray-500')}>
                    설정안함
                  </span>
                  <label className='custom-checkbox'>
                    <input
                      type='checkbox'
                      className='peer hidden'
                      checked={isLunchTimeUnset}
                      onChange={resetSettingsOnDisable}
                    />
                    <span className='flex h-[20px] w-[20px] items-center justify-center rounded-sm border border-solid border-gray-300 peer-checked:border-none peer-checked:bg-primary-500'>
                      {isLunchTimeUnset && (
                        <NoCircleCheckIcon width={15} height={12} fill='white' />
                      )}
                    </span>
                  </label>
                </div>
              </dd>
            </dl>

            {timeList.map((timeSetting, idx) =>
              (timeSetting.name === 'lunchStartTime' && timeSetting.state) ||
              (timeSetting.name === 'lunchEndTime' && timeSetting.state) ? (
                <div
                  className='relative mt-[28px] flex items-center justify-center'
                  key={`${timeSetting.name}_${idx}`}>
                  <TimeSwiper
                    items={timePeriods}
                    loop={false}
                    initialSlide={timePeriods.indexOf(timeSetting.timePeriods)}
                    onSlideChange={(e) =>
                      changeSlide(
                        'timePeriods',
                        timePeriods[e.realIndex],
                        timeSetting.name
                      )
                    }
                    className='timeSwiper'
                  />
                  <TimeSwiper
                    items={hours}
                    initialSlide={hours.indexOf(timeSetting.hours)}
                    onSlideChange={(e) =>
                      changeSlide('hours', hours[e.realIndex], timeSetting.name)
                    }
                    className='timeSwiper'
                  />
                  <TimeSwiper
                    items={minutes}
                    initialSlide={minutes.indexOf(timeSetting.minutes)}
                    onSlideChange={(e) =>
                      changeSlide('minutes', minutes[e.realIndex], timeSetting.name)
                    }
                    className='timeSwiper'
                  />
                  <div className='absolute left-4 right-4 top-1/2 h-9 -translate-y-1/2 rounded-lg bg-[#f2f3f5] text-2xl'></div>
                </div>
              ) : null
            )}
          </article>

          <article className='border-b border-solid border-gray-100'>
            <dl className='flex items-center justify-between py-[28px]'>
              <dt className={cn(Typography.TITLE_1_BOLD, 'text-black')}>수업 시간</dt>
              <dd>
                <Sheet open={isClassTimeSheetOpen} onOpenChange={setIsClassTimeSheetOpen}>
                  <SheetTrigger>
                    {classTimeState.map((item) => (item.checked ? item.time : ''))}
                  </SheetTrigger>
                  <SheetContent
                    side='bottom'
                    closeClassName='opacity-0'
                    className='rounded-tl-lg rounded-tr-lg px-7 pb-8 pt-4'>
                    <div className='m-auto mb-8 h-1 w-[44px] rounded-lg bg-gray-200' />
                    <ul>
                      {classTimeState.map((item, index) => {
                        return (
                          <li key={`${item.time}_${index}`}>
                            <Button
                              variant='ghost'
                              className={cn(
                                Typography.TITLE_1_SEMIBOLD,
                                'h-[54px] w-full items-center justify-between p-0 text-black'
                              )}
                              onClick={() => selectedClassTime(item.time)}>
                              {item.time}
                              {item.checked && (
                                <span>
                                  <NoCircleCheckIcon
                                    width={24}
                                    height={24}
                                    fill='var(--primary-500)'
                                  />
                                </span>
                              )}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </SheetContent>
                </Sheet>
              </dd>
            </dl>
          </article>

          <article>
            <dl className='py-[28px]'>
              <dt className={cn(Typography.TITLE_1_BOLD, 'mb-6 text-black')}>휴무일</dt>
              <dd>
                <ul className='flex items-center justify-between'>
                  {dayOfWeek.map((item: DayOfWeekType, index) => {
                    const isSelected = dayOff.includes(item.eng)
                      ? 'bg-primary-500 text-gray-100'
                      : 'bg-gray-100 text-gray-600';
                    return (
                      <li key={`${item.eng}_${index}`}>
                        <Button
                          className={cn(
                            Typography.TITLE_1_SEMIBOLD,
                            `p-4} w-[40px] rounded-[9999px] ${isSelected}`
                          )}
                          onClick={() => selectedDayClick(item.eng)}>
                          {item.kor}
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </dl>
          </article>
        </div>

        <div className='w-full'>
          <Button
            className='typography-title-1 h-[57px] w-full rounded-lg'
            onClick={handleSetClassTime}>
            수업 시간 설정
          </Button>
        </div>
      </Layout.Contents>
    </Layout>
  );
};
