import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/utils/tw-utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-interactive-disabled disabled:text-text-token-disabled',
  {
    variants: {
      variant: {
        default: 'bg-interactive-primary text-text-token-inverse hover:bg-interactive-primary-hover active:bg-interactive-primary-active',
        secondary: 'bg-surface-secondary text-interactive-primary',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-border-default bg-surface-background text-text-token-primary hover:bg-gray-50',
        ghost: 'hover:bg-gray-50',
        link: 'text-interactive-primary underline-offset-4 hover:underline',
        danger: 'bg-surface-danger text-text-token-inverse',
      },
      size: {
        default: 'h-11 px-4 py-[18px] text-sm',
        sm: 'h-9 rounded-md px-3 text-sm',
        lg: 'h-12 rounded-md px-8 text-base',
        icon: 'h-10 w-10',
        full: 'w-full py-[18px] px-4 text-sm',
        auto: '',
      },
      loading: {
        true: 'pointer-events-none opacity-70',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      loading: false,
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}>
        {loading ? (
          <span className='flex items-center gap-2'>
            <svg
              className='h-4 w-4 animate-spin'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              aria-hidden='true'>
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
              />
            </svg>
            {children}
          </span>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
