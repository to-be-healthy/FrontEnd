import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  AlarmData,
  NotificationCategoryAndType,
  SenderType,
  useReadAlarmMutation,
} from '@/entity/alarm';
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

  const handleCheckAlarm = (
    type: NotificationCategoryAndType,
    notificationId: number,
    memberId: number,
    memberName: string,
    targetId: number | null
  ) => {
    mutate(notificationId, {
      onSuccess: () => {
        if (type === 'SCHEDULE-FEEDBACK') {
          return router.push('/trainer/manage/feedback');
        }
        if (
          type === 'COMMUNITY-COMMENT' ||
          type === 'COMMUNITY-REPLY' ||
          type === 'COMMUNITY-WRITE'
        ) {
          return router.push(`/trainer/community/${targetId}`);
        }

        if (
          type === 'SCHEDULE-CANCEL' ||
          type === 'SCHEDULE-RESERVE' ||
          type === 'SCHEDULE-WAITING'
        ) {
          return router.push(
            `/trainer/manage/${memberId}/reservation?name=${memberName}`
          );
        }

        if (type === 'SCHEDULE-WRITE' || type === 'SCHEDULE-REPLY') {
          return router.push(`/trainer/manage/${memberId}/log/${targetId}`);
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
          onClick={() =>
            handleCheckAlarm(
              data.notificationCategoryAndType,
              data.notificationId,
              data.receiverId,
              data.receiverName,
              data.targetId
            )
          }>
          <Image
            src={sender ? sender?.profileUrl : ''}
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
