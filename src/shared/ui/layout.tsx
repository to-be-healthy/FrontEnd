import { Children, HTMLAttributes, isValidElement, ReactNode } from 'react';

import { Toaster } from '@/shared/ui';
import { StudentNavigation, TrainerNavigation } from '@/shared/ui';

import { cn } from '../utils';

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'student' | 'trainer';
}

export const Layout = ({ type, className, children, ...props }: LayoutProps) => {
  let header: ReactNode;
  const contents: ReactNode[] = [];
  let footer: ReactNode;

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === Header) {
      header = child;
    } else if (child.type === BottomArea) {
      footer = child;
    } else {
      contents.push(child);
    }
  });

  return (
    <div className={'flex h-screen items-center justify-center bg-[#383838]'}>
      <div
        className={cn('flex h-full w-[var(--max-width)] flex-col bg-gray-100', className)}
        {...props}>
        {header}
        {contents}
        {type === 'trainer' && <TrainerNavigation />}
        {type === 'student' && <StudentNavigation />}
        {type === undefined && footer}
        <Toaster />
      </div>
    </div>
  );
};

const Header = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <header
    className={cn(
      'flex h-[56px] w-full flex-none items-center justify-between p-[20px]',
      className
    )}
    {...props}>
    {children}
  </header>
);
Header.displayName = 'Header';

const Contents = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <main className={cn('h-full w-full flex-grow overflow-y-auto', className)} {...props}>
    {children}
  </main>
);
Contents.displayName = 'Contents';

const BottomArea = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <footer className={cn('w-full p-[20px]', className)} {...props}>
    {children}
  </footer>
);

Layout.Header = Header;
Layout.Contents = Contents;
Layout.BottomArea = BottomArea;
