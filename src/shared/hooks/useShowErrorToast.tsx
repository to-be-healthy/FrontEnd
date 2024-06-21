import { IconError } from '@/shared/assets';

import { Typography } from '../mixin';
import { useToast } from '../ui';
import { cn } from '../utils';

export const useShowErrorToast = () => {
  const { toast } = useToast();

  const showErrorToast = (message: string) => {
    toast({
      className: 'h-auto',
      description: (
        <div className='flex items-center justify-center'>
          <div className='h-8 w-8'>
            <IconError />
          </div>
          <p className={cn(Typography.HEADING_5, 'ml-6 text-white')}>{message}</p>
        </div>
      ),
      duration: 2000,
    });
  };

  return { showErrorToast };
};
