'use client';

import { SwipeDirection } from '@radix-ui/react-toast';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/shared/ui/toast';
import { useToast } from '@/shared/ui/use-toast';

import { cn } from '../utils/tw-utils';

interface toastType {
  swipeDirection?: SwipeDirection;
  ViewportClassName?: string;
  hasClose?: boolean;
}
export function Toaster({
  ViewportClassName,
  swipeDirection,
  hasClose = false,
}: toastType) {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection={swipeDirection}>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className='h-[56px]'>
            <div className='grid h-full gap-1'>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            {hasClose && <ToastClose />}
          </Toast>
        );
      })}
      <ToastViewport className={cn(ViewportClassName)} />
    </ToastProvider>
  );
}
