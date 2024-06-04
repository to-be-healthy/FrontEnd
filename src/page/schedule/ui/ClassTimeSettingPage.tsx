'use client';
import 'swiper/css';
import './swiper.css';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useState } from 'react';

import {
  ClassTimeSettingData,
  DayOfWeek,
  useTrainerClassTimeSettingMutation,
} from '@/feature/schedule';
import { useGetTrainerClassTimeSettingQuery } from '@/feature/schedule/api/useGetTrainerClassTimeSettingQuery';
import { IconCheck } from '@/shared/assets';
import IconNoCircleCheck from '@/shared/assets/images/noCircleCheck.svg';
import { useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import { Button, Sheet, SheetContent, SheetTrigger, useToast } from '@/shared/ui';
import { TimeSwiper } from '@/shared/ui/time-swiper';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

type TimeSettings =
  | 'lessonStartTime'
  | 'lessonEndTime'
  | 'lunchStartTime'
  | 'lunchEndTime';

interface TimeListType {
  name: TimeSettings;
  timePeriods: string;
  hours: string;
  minutes: string;
  state: boolean;
}

const dayOfWeekMap: Record<DayOfWeek, string> = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
};

const classTime = [30, 60, 90, 120];
const timePeriods = ['오전', '오후'];
const hours = Array.from({ length: 12 }, (_, i) => String(i + 1));
const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : String(i)));

export const ClassTimeSettingPage = () => {
  const { data: classTimeData } = useGetTrainerClassTimeSettingQuery();
  const [timeList, setTimeList] = useState<TimeListType[]>([]);
  const [isLunchTimeUnset, setIsLunchTimeUnset] = useState(false); //점심시간 설정 체크 유무
  const [isClassTimeSheetOpen, setIsClassTimeSheetOpen] = useState(false); // 수업시간 sheet
  const [classTimeState, setClassTimeState] = useState(0); //수업시간
  const [dayOff, setDayOff] = useState<DayOfWeek[]>([]); //휴무일
  const { showErrorToast } = useShowErrorToast();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate } = useTrainerClassTimeSettingMutation();

  const formatTo24HourTime = (timeList: TimeListType) => {
    const isPM = timeList.timePeriods === '오후';
    const timeString = `${timeList.hours}:${timeList.minutes}`;
    let formattedTime = dayjs(timeString, 'h:mm');

    if (
      (isPM && Number(timeList.hours) !== 12) ||
      (!isPM && Number(timeList.hours) === 12)
    ) {
      formattedTime = formattedTime.add(12, 'h');
    }
    return formattedTime.format('HH:mm');
  };

  const formatTimeTo12Hour = (timeString: string) => {
    if (!timeString) return '';
    const formattedTime = dayjs(timeString, 'HH:mm').format('A h:mm');
    const [periodKor, timeRest] = formattedTime.split(' ');

    return [periodKor, ...timeRest.split(':')];
  };

  const convertTimeData = (classTimeData: ClassTimeSettingData) => {
    return {
      lessonStartTime: formatTimeTo12Hour(classTimeData?.lessonStartTime),
      lessonEndTime: formatTimeTo12Hour(classTimeData?.lessonEndTime),
      lunchStartTime: formatTimeTo12Hour(classTimeData?.lunchStartTime),
      lunchEndTime: formatTimeTo12Hour(classTimeData?.lunchEndTime),
    };
  };

  const isValidTime = (startTime: string, endTime: string) => {
    const start = dayjs(startTime, 'HH:mm');
    const end = dayjs(endTime, 'HH:mm');

    return start.isSame(end) ? false : dayjs(start).isBefore(end);
  };

  const handleSetClassTime = (e: MouseEvent<HTMLButtonElement>, skip?: boolean) => {
    e.preventDefault();

    const registrationData = (data: ClassTimeSettingData) => {
      mutate(data, {
        onSuccess: ({ message }) => {
          toast({
            className: 'py-5 px-6',
            description: (
              <div className='flex items-center justify-center'>
                <IconCheck fill={'var(--primary-500)'} width={17} height={17} />
                <p className='typography-heading-5 ml-6 text-[#fff]'>{message}</p>
              </div>
            ),
            duration: 2000,
          });
          router.push('/trainer');
        },
        onError: (error) => {
          showErrorToast(error.response?.data?.message ?? 'Unknown error');
        },
      });
    };

    if (skip) {
      const defaultData = {
        lessonStartTime: '10:00',
        lessonEndTime: '20:00',
        lunchStartTime: '12:00',
        lunchEndTime: '13:00',
        closedDays: [],
        lessonTime: 60,
      };

      registrationData(defaultData);
    }

    const selectedTimeList = timeList.map((list) => formatTo24HourTime(list));

    if (!skip) {
      if (
        !isValidTime(selectedTimeList[0], selectedTimeList[1]) ||
        !isValidTime(selectedTimeList[2], selectedTimeList[3])
      ) {
        return showErrorToast('시작 시간은 종료 시간보다 빨라야 합니다');
      }

      if (classTimeState && selectedTimeList) {
        const settings = {
          lessonStartTime: selectedTimeList[0],
          lessonEndTime: selectedTimeList[1],
          lunchStartTime: isLunchTimeUnset ? '' : selectedTimeList[2],
          lunchEndTime: isLunchTimeUnset ? '' : selectedTimeList[3],
          closedDays: dayOff,
          lessonTime: classTimeState,
        };
        registrationData(settings);
      }
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

  //timepicker 스크롤, 클릭, 스와이프
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

  //설정안함 체크박스 클릭시
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

  //수업시간 선택
  const selectedClassTime = (selectedTime: number) => {
    setClassTimeState(selectedTime);
    setIsClassTimeSheetOpen(false);
  };

  //휴무일 선택
  const selectedDayClick = (day: DayOfWeek) => {
    if (dayOff.includes(day)) {
      setDayOff(dayOff.filter((d) => d !== day));
    } else {
      setDayOff([...dayOff, day]);
    }
  };

  useEffect(() => {
    if (classTimeData) {
      const settingTimeData = convertTimeData(classTimeData);

      const newTimeList: TimeListType[] = [
        {
          name: 'lessonStartTime',
          timePeriods: settingTimeData?.lessonStartTime[0],
          hours: settingTimeData?.lessonStartTime[1],
          minutes: settingTimeData?.lessonStartTime[2],
          state: false,
        },
        {
          name: 'lessonEndTime',
          timePeriods: settingTimeData?.lessonEndTime[0],
          hours: settingTimeData?.lessonEndTime[1],
          minutes: settingTimeData?.lessonEndTime[2],
          state: false,
        },
        {
          name: 'lunchStartTime',
          timePeriods: !settingTimeData.lunchStartTime
            ? '오후'
            : settingTimeData?.lunchStartTime[0],
          hours: !settingTimeData.lunchStartTime
            ? '12'
            : settingTimeData?.lunchStartTime[1],
          minutes: !settingTimeData.lunchStartTime
            ? '00'
            : settingTimeData?.lunchStartTime[2],
          state: false,
        },
        {
          name: 'lunchEndTime',
          timePeriods: !settingTimeData.lunchEndTime
            ? '오후'
            : settingTimeData?.lunchEndTime[0],
          hours: !settingTimeData.lunchEndTime ? '1' : settingTimeData?.lunchEndTime[1],
          minutes: !settingTimeData.lunchEndTime
            ? '00'
            : settingTimeData?.lunchEndTime[2],
          state: false,
        },
      ];
      setTimeList(newTimeList);
      setClassTimeState(classTimeData.lessonTime);
      setDayOff(classTimeData.closedDays);
      setIsLunchTimeUnset(
        classTimeData.lunchStartTime === null && classTimeData.lunchEndTime === null
      );
    }
  }, [classTimeData]);

  return (
    <Layout>
      <Layout.Header className='flex justify-end bg-[#fff]'>
        <Button
          variant='ghost'
          className={cn(Typography.BODY_1, 'p-0 text-gray-500')}
          onClick={(e) => handleSetClassTime(e, true)}>
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

          {timeList.length > 0 && (
            <>
              <article className='border-b border-solid border-gray-100 pb-[28px]'>
                <dl className='flex items-center justify-between'>
                  <dt className={cn(Typography.TITLE_1_BOLD, 'text-black')}>근무 시간</dt>
                  <dd>
                    <Button
                      className={cn(
                        Typography.BODY_2,
                        'w-[89px] rounded-md bg-gray-100 py-4 text-black'
                      )}
                      onClick={() => openTimePicker('lessonStartTime')}>
                      {`${timeList[0].timePeriods} ${timeList[0].hours}:${timeList[0].minutes}`}
                    </Button>
                    <span className={cn(Typography.BODY_1, 'mx-1')}>~</span>
                    <Button
                      className={cn(
                        Typography.BODY_2,
                        'w-[89px] rounded-md bg-gray-100 py-4 text-black'
                      )}
                      onClick={() => openTimePicker('lessonEndTime')}>
                      {`${timeList[1].timePeriods} ${timeList[1].hours}:${timeList[1].minutes}`}
                    </Button>
                  </dd>
                </dl>

                {timeList.map((timeSetting, idx) =>
                  (timeSetting.name === 'lessonStartTime' && timeSetting.state) ||
                  (timeSetting.name === 'lessonEndTime' && timeSetting.state) ? (
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
                            <IconNoCircleCheck width={15} height={12} fill='white' />
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
                    <Sheet
                      open={isClassTimeSheetOpen}
                      onOpenChange={setIsClassTimeSheetOpen}>
                      <SheetTrigger>
                        {classTime.map((item) =>
                          item === classTimeState
                            ? `${Math.floor(item / 60) === 0 ? '' : `${Math.floor(item / 60)}시간`} ${item % 60 === 0 ? '' : '30분'}`
                            : ''
                        )}
                      </SheetTrigger>
                      <SheetContent side='bottom' headerType='thumb' className='pt-4'>
                        <ul>
                          {classTime.map((item, index) => {
                            return (
                              <li key={`${item}_${index}`}>
                                <Button
                                  variant='ghost'
                                  className={cn(
                                    Typography.TITLE_1_SEMIBOLD,
                                    'h-[54px] w-full items-center justify-between p-0 text-black'
                                  )}
                                  onClick={() => selectedClassTime(item)}>
                                  {`${Math.floor(item / 60) === 0 ? '' : `${Math.floor(item / 60)}시간`} ${item % 60 === 0 ? '' : '30분'}`}
                                  {item === classTimeState && (
                                    <span>
                                      <IconNoCircleCheck
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
                  <dt className={cn(Typography.TITLE_1_BOLD, 'mb-6 text-black')}>
                    휴무일
                  </dt>
                  <dd>
                    <ul className='flex items-center justify-between'>
                      {Object.entries(dayOfWeekMap).map(([eng, kor], index) => {
                        const isSelected = dayOff.includes(eng as DayOfWeek)
                          ? 'bg-primary-500 text-gray-100'
                          : 'bg-gray-100 text-gray-600';
                        return (
                          <li key={`${eng}_${index}`}>
                            <Button
                              className={cn(
                                Typography.TITLE_1_SEMIBOLD,
                                `p-4} w-[40px] rounded-[9999px] ${isSelected}`
                              )}
                              onClick={() => selectedDayClick(eng as DayOfWeek)}>
                              {kor}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </dd>
                </dl>
              </article>
            </>
          )}
        </div>
      </Layout.Contents>

      <Layout.BottomArea className='bg-white'>
        <Button
          size='full'
          className='typography-title-1 h-[57px] rounded-lg'
          onClick={(e) => handleSetClassTime(e)}>
          수업 시간 설정
        </Button>
      </Layout.BottomArea>
    </Layout>
  );
};
