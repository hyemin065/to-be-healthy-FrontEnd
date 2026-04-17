import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, InputHTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

const inputVariants = cva(
  'w-full outline-none transition-colors autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] placeholder:text-text-token-tertiary disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-border-default focus:border-interactive-primary',
        error: 'border-border-error focus:border-border-error',
        ghost: 'border-transparent bg-transparent',
      },
      inputSize: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-14 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

export type InputVariants = VariantProps<typeof inputVariants>;

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    InputVariants {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', variant, inputSize, ...props }, inputRef) => {
    return (
      <input
        className={cn(inputVariants({ variant, inputSize, className }))}
        type={type}
        ref={inputRef}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { inputVariants };
