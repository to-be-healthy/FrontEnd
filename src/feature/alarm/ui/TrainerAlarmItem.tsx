import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { AlarmData, SenderType, useReadAlarmMutation } from '@/entity/alarm';
import { Typography } from '@/shared/mixin';
import { cn, formatTimestampToRelativeTime } from '@/shared/utils';

interface AlarmItemProps {
  data: AlarmData;
  sender: SenderType;
}

export const TrainerAlarmItem = ({ data, sender }: AlarmItemProps) => {
  const router = useRouter();
  const relativeTime = formatTimestampToRelativeTime(data.createdAt);

  const { mutate } = useReadAlarmMutation(data.notificationId);

  const handleCheckAlarm = () => {
    mutate(data.notificationId, {
      onSuccess: () => {
        if (data.notificationCategoryAndType === 'SCHEDULE-FEEDBACK') {
          return router.push('/trainer/manage/feedback');
        }
        if (
          data.notificationCategoryAndType === 'COMMUNITY-COMMENT' ||
          data.notificationCategoryAndType === 'COMMUNITY-REPLY' ||
          data.notificationCategoryAndType === 'COMMUNITY-WRITE'
        ) {
          return router.push(`/trainer/community/${data.targetId}`);
        }

        if (
          data.notificationCategoryAndType === 'SCHEDULE-CANCEL' ||
          data.notificationCategoryAndType === 'SCHEDULE-RESERVE' ||
          data.notificationCategoryAndType === 'SCHEDULE-WAITING'
        ) {
          return router.push(
            `/trainer/manage/${data.studentId}/reservation?name=${data.studentName}`
          );
        }

        if (
          data.notificationCategoryAndType === 'SCHEDULE-WRITE' ||
          data.notificationCategoryAndType === 'SCHEDULE-REPLY'
        ) {
          return router.push(`/trainer/manage/${data.studentId}/log/${data.targetId}`);
        }
      },
    });
  };

  return (
    data && (
      <li key={data.notificationId}>
        <button
          className={cn(
            'flex h-auto w-full items-start justify-start p-7',
            data.isRead ? 'bg-white' : 'bg-blue-50'
          )}
          onClick={handleCheckAlarm}>
          <Image
            src={sender ? `${sender?.profileUrl}?w=300&h=300&q=90` : ''}
            width={37}
            height={37}
            alt='alarm profile'
            className={cn('h-fit rounded-full')}
            priority
          />
          <div className='ml-6 flex w-full flex-col justify-start'>
            <div className='mb-1 flex w-full items-center justify-between'>
              <h3 className={cn(Typography.BODY_4_MEDIUM, 'text-gray-500')}>
                {data.title}
              </h3>
              <span className={cn(Typography.BODY_4_REGULAR, 'text-gray-500')}>
                {relativeTime}
              </span>
            </div>
            <p className={cn(Typography.TITLE_1_SEMIBOLD, 'text-left text-black')}>
              {data.content}
            </p>
          </div>
        </button>
      </li>
    )
  );
};
