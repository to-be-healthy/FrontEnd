import { IconError } from '@/shared/assets';

import { useToast } from '../ui';

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
          <p className='typography-heading-5 ml-6 text-[#fff]'>{message}</p>
        </div>
      ),
      duration: 2000,
    });
  };

  return { showErrorToast };
};
