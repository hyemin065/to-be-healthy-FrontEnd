import { Children, forwardRef, HTMLAttributes, isValidElement, ReactNode } from 'react';

import { LowercaseMemberType } from '@/entity/auth';
import { cn } from '@/shared/utils';

import { StudentNavigation, TrainerNavigation } from './navigation';

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  type?: LowercaseMemberType;
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
    <div className={'flex h-full items-center justify-center bg-black'}>
      <div
        className={cn('flex h-full w-[var(--max-width)] flex-col bg-gray-100', className)}
        {...props}>
        {header}
        {contents}
        {type === 'trainer' && <TrainerNavigation />}
        {type === 'student' && <StudentNavigation />}
        {type === undefined && footer}
      </div>
    </div>
  );
};

const Header = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ children, className, ...props }, ref) => (
    <header
      ref={ref}
      role='banner'
      className={cn(
        'relative flex h-[56px] w-full flex-none items-center justify-between px-7 py-6',
        className
      )}
      {...props}>
      {children}
    </header>
  )
);
Header.displayName = 'Header';

const Contents = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ children, className, id = 'main-content', ...props }, ref) => (
    <main
      ref={ref}
      id={id}
      className={cn('h-full w-full flex-1 flex-shrink-0 overflow-y-auto', className)}
      {...props}>
      {children}
    </main>
  )
);
Contents.displayName = 'Contents';

const BottomArea = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ children, className, ...props }, ref) => (
    <footer ref={ref} className={cn('w-full p-7', className)} {...props}>
      {children}
    </footer>
  )
);
BottomArea.displayName = 'BottomArea';

Layout.Header = Header;
Layout.Contents = Contents;
Layout.BottomArea = BottomArea;
