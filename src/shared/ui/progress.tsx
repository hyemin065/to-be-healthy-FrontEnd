import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

import { cn } from '../utils';

const progressVariants = cva('relative w-full overflow-hidden rounded-full', {
  variants: {
    variant: {
      default: 'bg-interactive-primary/20',
      success: 'bg-green-100',
      warning: 'bg-amber-100',
    },
    size: {
      sm: 'h-[2px]',
      md: 'h-[4px]',
      lg: 'h-[8px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const progressBarVariants = cva(
  'h-full w-full flex-1 rounded-full transition-all',
  {
    variants: {
      variant: {
        default: 'bg-surface-background',
        success: 'bg-green-500',
        warning: 'bg-amber-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type ProgressVariants = VariantProps<typeof progressVariants>;

interface ProgressProps extends HTMLAttributes<HTMLDivElement>, ProgressVariants {
  value: number;
  progressClassName?: string;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, progressClassName, value, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      role='progressbar'
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(progressVariants({ variant, size, className }))}
      {...props}>
      <div
        className={cn(progressBarVariants({ variant }), progressClassName)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
);
Progress.displayName = 'Progress';

export { Progress, progressVariants };
