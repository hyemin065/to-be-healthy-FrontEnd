import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/utils/tw-utils';

const chipVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-medium transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive-primary focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        filled: 'bg-gray-100 text-text-token-primary',
        outlined: 'border border-border-default bg-transparent text-text-token-primary',
      },
      size: {
        sm: 'px-2 py-0.5 text-[var(--font-size-xs)]',
        md: 'px-3 py-1 text-[var(--font-size-sm)]',
      },
      selected: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'filled',
        selected: true,
        className: 'bg-surface-secondary text-interactive-primary',
      },
      {
        variant: 'outlined',
        selected: true,
        className: 'border-interactive-primary text-interactive-primary',
      },
    ],
    defaultVariants: {
      variant: 'filled',
      size: 'md',
      selected: false,
    },
  }
);

export type ChipVariants = VariantProps<typeof chipVariants>;

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'>,
    ChipVariants {
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    { className, variant, size, selected, removable, onRemove, onClick, children, ...props },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    };

    const handleRemoveKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onRemove?.();
      }
    };

    return (
      <span
        ref={ref}
        role='option'
        aria-selected={selected ?? false}
        tabIndex={0}
        className={cn(chipVariants({ variant, size, selected, className }))}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...props}>
        {children}
        {removable && (
          <button
            type='button'
            aria-label='삭제'
            className='ml-0.5 rounded-full p-0.5 hover:bg-black/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-primary'
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            onKeyDown={handleRemoveKeyDown}
            tabIndex={-1}>
            <X className='h-3 w-3' aria-hidden='true' />
          </button>
        )}
      </span>
    );
  }
);
Chip.displayName = 'Chip';

export { Chip, chipVariants };
