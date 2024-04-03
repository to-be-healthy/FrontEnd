import { Children, isValidElement, PropsWithChildren, ReactNode } from 'react';

import { Toaster } from '@/shared/ui';
import { StudentNavigation, TrainerNavigation } from '@/shared/ui';

import { cn } from '../utils';

interface LayoutProps extends PropsWithChildren {
  type?: 'student' | 'trainer';
  className?: string;
}

export const Layout = ({ type, className, children }: LayoutProps) => {
  let header: ReactNode;
  const contents: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === Header) {
      header = child;
    } else {
      contents.push(child);
    }
  });

  return (
    <div className={'flex h-screen items-center justify-center bg-[#383838]'}>
      <div className={cn('flex h-full w-[390px] flex-col bg-gray-100', className)}>
        {header}
        {contents}
        <Toaster />
        {type === 'trainer' && <TrainerNavigation />}
        {type === 'student' && <StudentNavigation />}
      </div>
    </div>
  );
};

interface HeaderProps {
  children: ReactNode;
  className?: string;
}
const Header = ({ children, className }: HeaderProps) => (
  <header
    className={cn(
      'flex h-14 flex-none items-center justify-between px-[20px] py-[16px]',
      className
    )}>
    {children}
  </header>
);
Header.displayName = 'Header';

interface ContentsProps {
  children: ReactNode;
  className?: string;
}
const Contents = ({ children, className }: ContentsProps) => (
  <main className={cn('h-full flex-grow overflow-y-auto', className)}>{children}</main>
);
Contents.displayName = 'Contents';

Layout.Header = Header;
Layout.Contents = Contents;
