'use client';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

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
import { Typography } from '@/shared/mixin';
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

export const ClassTimeSettingPage = () => {
  const { data: classTimeData } = useGetTrainerClassTimeSettingQuery();
  const [timeList, setTimeList] = useState<TimeListType[]>([]);
  const [isLunchTimeUnset, setIsLunchTimeUnset] = useState(false); //점심시간 설정 체크 유무
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
                <p className={cn(Typography.HEADING_5, 'ml-6 text-white')}>{message}</p>
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
          lunchStartTime: isLunchTimeUnset ? null : selectedTimeList[2],
          lunchEndTime: isLunchTimeUnset ? null : selectedTimeList[3],
          closedDays: dayOff,
          lessonTime: classTimeState,
        };
        registrationData(settings);
      }
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
    <Layout className='bg-white'>
      <Layout.Header className='flex justify-end'>
        <Button
          variant='ghost'
          className={cn(Typography.BODY_1, 'p-0 text-gray-500')}
          onClick={(e) => handleSetClassTime(e, true)}>
          건너뛰기
        </Button>
      </Layout.Header>

      <Layout.Contents className='px-7 pb-[30px] pt-5'>
        <h2 className={cn(Typography.HEADING_1, 'mb-5 text-black')}>
          기본 수업 시간을
          <br />
          설정해주세요.
        </h2>
        <p className={cn(Typography.BODY_2, 'mb-[56px] text-gray-600')}>
          기본 수업 시간은 내 스케줄에서
          <br />
          자유롭게 변경하실 수 있습니다.
        </p>

        <ClassTimeSetting
          timeList={timeList}
          setTimeList={setTimeList}
          isLunchTimeUnset={isLunchTimeUnset}
          setIsLunchTimeUnset={setIsLunchTimeUnset}
          classTimeState={classTimeState}
          setClassTimeState={setClassTimeState}
          dayOff={dayOff}
          setDayOff={setDayOff}
        />
      </Layout.Contents>

      <Layout.BottomArea className='w-full p-7'>
        <Button
          size='full'
          className={cn(Typography.TITLE_1, 'h-[57px] rounded-lg')}
          onClick={(e) => handleSetClassTime(e)}>
          수업 시간 설정
        </Button>
      </Layout.BottomArea>
    </Layout>
  );
};
