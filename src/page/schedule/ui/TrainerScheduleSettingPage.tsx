'use client';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { IconBack } from '@/shared/assets';
import { Typography } from '@/shared/mixin';

dayjs.extend(customParseFormat);
import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useState } from 'react';

import {
  ClassTimeSetting,
  ClassTimeSettingData,
  DayOfWeek,
  useTrainerClassTimeSettingMutation,
} from '@/feature/schedule';
import { useGetTrainerClassTimeSettingQuery } from '@/feature/schedule/api/useGetTrainerClassTimeSettingQuery';
import { IconCheck } from '@/shared/assets';
import { useShowErrorToast } from '@/shared/hooks';
import { Button, useToast } from '@/shared/ui';
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

//TODO: 리팩토링예정
const TrainerScheduleSettingPage = () => {
  const [timeList, setTimeList] = useState<TimeListType[]>([]);
  const [isLunchTimeUnset, setIsLunchTimeUnset] = useState(false); //점심시간 설정 체크 유무
  const [classTimeState, setClassTimeState] = useState(0); //수업시간
  const [dayOff, setDayOff] = useState<DayOfWeek[]>([]); //휴무일
  const [selectedTimeListArr, setSelectedTimeListArr] = useState<string[]>([]);

  const { showErrorToast } = useShowErrorToast();
  const { toast } = useToast();
  const router = useRouter();

  const { data: classTimeData } = useGetTrainerClassTimeSettingQuery();
  const { mutate } = useTrainerClassTimeSettingMutation();

  //TODO:utils함수로 변경예정
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
      lunchStartTime: formatTimeTo12Hour(
        classTimeData?.lunchStartTime ? classTimeData?.lunchStartTime : '12:00'
      ),
      lunchEndTime: formatTimeTo12Hour(
        classTimeData?.lunchEndTime ? classTimeData?.lunchEndTime : '13:00'
      ),
    };
  };

  const isValidTime = (startTime: string, endTime: string) => {
    const start = dayjs(startTime, 'HH:mm');
    const end = dayjs(endTime, 'HH:mm');

    return start.isSame(end) ? false : dayjs(start).isBefore(end);
  };

  const registrationData = (data: ClassTimeSettingData) => {
    mutate(data, {
      onSuccess: ({ message }) => {
        toast({
          className: 'py-5 px-6',
          description: (
            <div className='flex items-center justify-center'>
              <IconCheck fill={'var(--primary-500)'} width={17} height={17} />
              <p className={cn(Typography.HEADING_5, 'ml-6 text-white')}>{message}</p>
            </div>
          ),
          duration: 2000,
        });
        router.push('/trainer/schedule');
      },
      onError: (error) => {
        showErrorToast(error.response?.data?.message ?? 'Unknown error');
      },
    });
  };

  const submitButtonDisabled = (): boolean => {
    const settings = {
      lessonStartTime: selectedTimeListArr[0],
      lessonEndTime: selectedTimeListArr[1],
      lunchStartTime: isLunchTimeUnset ? null : selectedTimeListArr[2],
      lunchEndTime: isLunchTimeUnset ? null : selectedTimeListArr[3],
      lessonTime: classTimeState,
      closedDays: dayOff,
    };

    return JSON.stringify(classTimeData) === JSON.stringify(settings);
  };

  const handleSetClassTime = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      !isValidTime(selectedTimeListArr[0], selectedTimeListArr[1]) ||
      !isValidTime(selectedTimeListArr[2], selectedTimeListArr[3])
    ) {
      return showErrorToast('시작 시간은 종료 시간보다 빨라야 합니다');
    }

    const settings = {
      lessonStartTime: selectedTimeListArr[0],
      lessonEndTime: selectedTimeListArr[1],
      lunchStartTime: isLunchTimeUnset ? '' : selectedTimeListArr[2],
      lunchEndTime: isLunchTimeUnset ? '' : selectedTimeListArr[3],
      lessonTime: classTimeState,
      closedDays: dayOff,
    };

    registrationData(settings);
  };

  //TODO: hooks으로 변경예정
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classTimeData]);

  useEffect(() => {
    const selectedTimeList = timeList.map((list) => formatTo24HourTime(list));
    setSelectedTimeListArr(selectedTimeList);
  }, [timeList]);

  return (
    <Layout>
      <Layout.Header className='bg-white'>
        <Button
          variant='ghost'
          size='auto'
          onClick={() => router.replace('/trainer/schedule')}>
          <IconBack />
        </Button>
        <p className={cn(Typography.HEADING_4_SEMIBOLD)}>기본 수업 시간</p>
        <Button
          variant='ghost'
          size='auto'
          onClick={handleSetClassTime}
          className={cn(
            Typography.BODY_1,
            'text-primary disabled:bg-transparent disabled:text-gray-500'
          )}
          disabled={submitButtonDisabled()}>
          저장
        </Button>
      </Layout.Header>
      <Layout.Contents className='bg-white px-7'>
        <ClassTimeSetting />
      </Layout.Contents>
    </Layout>
  );
};

export { TrainerScheduleSettingPage };
