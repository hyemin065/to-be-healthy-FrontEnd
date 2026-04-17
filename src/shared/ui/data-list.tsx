import * as React from 'react';

import { cn } from '@/shared/utils/tw-utils';

/* ── Root ──────────────────────────────────────────────────────── */

const DataListRoot = React.forwardRef<
  HTMLDListElement,
  React.HTMLAttributes<HTMLDListElement>
>(({ className, ...props }, ref) => (
  <dl ref={ref} className={cn('flex flex-col gap-3', className)} {...props} />
));
DataListRoot.displayName = 'DataList';

/* ── Item ──────────────────────────────────────────────────────── */

const DataListItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between', className)}
    {...props}
  />
));
DataListItem.displayName = 'DataListItem';

/* ── Label ─────────────────────────────────────────────────────── */

const DataListLabel = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <dt
    ref={ref}
    className={cn(
      'text-[var(--font-size-base)]/[var(--line-height-relaxed)] text-text-token-secondary',
      className
    )}
    {...props}
  />
));
DataListLabel.displayName = 'DataListLabel';

/* ── Value ─────────────────────────────────────────────────────── */

const DataListValue = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <dd
    ref={ref}
    className={cn(
      'text-[var(--font-size-base)]/[var(--line-height-relaxed)] font-semibold text-text-token-primary',
      className
    )}
    {...props}
  />
));
DataListValue.displayName = 'DataListValue';

/* ── Compose ───────────────────────────────────────────────────── */

const DataList = Object.assign(DataListRoot, {
  Item: DataListItem,
  Label: DataListLabel,
  Value: DataListValue,
});

export { DataList };
