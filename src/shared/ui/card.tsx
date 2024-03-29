import { forwardRef, HTMLAttributes } from 'react';

import { cn } from '../utils/tw-utils';

const CARD_NAME = 'Card';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'h-35 relative flex w-40 flex-col gap-y-[10px] rounded-[12px] bg-white p-[16px]',
        'text-[17px]/[24px] font-bold', // typography-heading-4
        '', // TODO) box-shadow
        className
      )}
      {...props}
    />
  )
);

Card.displayName = CARD_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardHeader
 * -----------------------------------------------------------------------------------------------*/

const CARD_HEADER_NAME = 'CardHeader';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, forwardedRef) => (
    <div
      ref={forwardedRef}
      className={cn(
        'text-[17px]/[24px] font-bold', // typography-heading-4
        className
      )}
      {...props}
    />
  )
);

CardHeader.displayName = CARD_HEADER_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardContent
 * -----------------------------------------------------------------------------------------------*/

const CARD_CONTENT_NAME = 'CardContent';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, forwardedRef) => (
    <div
      ref={forwardedRef}
      className={cn(
        'whitespace-pre-wrap font-normal text-gray-500',
        'text-[12px]/[20px] font-normal', // typography-body-4
        className
      )}
      {...props}
    />
  )
);

CardContent.displayName = CARD_CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardFooter
 * -----------------------------------------------------------------------------------------------*/

const CARD_FOOTER_NAME = 'CardFooter';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, forwardedRef) => (
    <div ref={forwardedRef} className={cn('', className)} {...props} />
  )
);

CardFooter.displayName = CARD_FOOTER_NAME;

export { Card, CardContent, CardFooter, CardHeader };
