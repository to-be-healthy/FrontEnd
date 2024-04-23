'use client';

import {
  createContext,
  Dispatch,
  FormEvent,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Typography } from '@/shared/mixin';
import {
  Button,
  Input,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui';
import { cn } from '@/shared/utils';

interface SheetContextType {
  isSheetOpen: boolean;
}

const SheetContext = createContext<SheetContextType>({
  isSheetOpen: false,
});

interface CourseSheetFooterProps {
  text?: string;
  courseInput: string;
  clickButtonHandler?: () => void;
}

export const CourseSheetFooter = ({
  text,
  courseInput,
  clickButtonHandler,
}: CourseSheetFooterProps) => {
  return (
    <SheetFooter>
      <Button
        className={cn('h-[52px] w-full', Typography.TITLE_1)}
        disabled={courseInput === '' || Number(courseInput) > 500}
        onClick={clickButtonHandler}>
        {text}
      </Button>
    </SheetFooter>
  );
};

interface CourseSheetTitleProps {
  title?: string;
}

export const CourseSheetHeader = ({ title }: CourseSheetTitleProps) => {
  return (
    <SheetHeader>
      <SheetTitle className={cn('mb-8 text-left text-[#000]', Typography.HEADING_4)}>
        {title}
      </SheetTitle>
    </SheetHeader>
  );
};

interface CourseSheetContentProps {
  title?: string;
  buttonText?: string;
  courseInput: string;
  setCourseInput: Dispatch<SetStateAction<string>>;
  courseInputError: string;
  setCourseInputError: Dispatch<SetStateAction<string>>;
}

export const CourseSheetContent = ({
  title,
  buttonText,
  courseInput,
  setCourseInput,
  courseInputError,
  setCourseInputError,
}: CourseSheetContentProps) => {
  const isSheetOpen = useContext(SheetContext);
  const changeCourseInput = (e: FormEvent<HTMLInputElement>) => {
    let inputValue = e.currentTarget.value;
    if (inputValue.length > 3) {
      inputValue = inputValue.slice(0, 3);
    }

    if (Number(inputValue) > 500) {
      setCourseInputError('500회 이하로 입력해주세요.');
    } else {
      setCourseInputError('');
    }
    setCourseInput(inputValue);
  };

  useEffect(() => {
    if (!isSheetOpen) {
      setCourseInput('');
      setCourseInputError('');
    }
  }, [isSheetOpen]);

  return (
    <SheetContent
      className='m-auto mb-7 w-[calc(100%-20px)] rounded-lg px-7 pb-9 pt-8'
      closeClassName='top-7 right-7'
      xClassName='w-[22px] h-[22px] text-[#000]'
      side='bottom'>
      <CourseSheetHeader title={title} />
      <div className='mb-8 text-center'>
        <Input
          type='number'
          value={courseInput}
          onChange={changeCourseInput}
          className={cn(
            'border-b-1 w-[100px] border-b border-solid border-y-gray-400 py-[2px] text-center text-[40px] font-bold leading-[130%] text-[#000] focus:border-y-primary-500',
            courseInputError && 'focus:border-y-red-500'
          )}
        />
        {courseInputError && (
          <p className={cn('mt-[8px] text-[#FF4668]', Typography.BODY_4)}>
            {courseInputError}
          </p>
        )}
      </div>
      <CourseSheetFooter courseInput={courseInput} text={buttonText} />
    </SheetContent>
  );
};

interface CourseSheetTriggerProps {
  className?: string;
  children: ReactNode;
}

export const CourseSheetTrigger = ({ className, children }: CourseSheetTriggerProps) => {
  return (
    <SheetTrigger className={cn(Typography.HEADING_5, className)}>
      {children}
    </SheetTrigger>
  );
};

interface CourseSheetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CourseSheet = ({ children }: CourseSheetProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <SheetContext.Provider value={{ isSheetOpen }}>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        {children}
      </Sheet>
    </SheetContext.Provider>
  );
};
