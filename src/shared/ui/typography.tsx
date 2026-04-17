import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/utils/tw-utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      heading1: 'text-[var(--font-size-5xl)]/[var(--line-height-tight)] font-bold',
      heading2: 'text-[var(--font-size-4xl)]/[var(--line-height-tight)] font-bold',
      heading3: 'text-[var(--font-size-3xl)]/[var(--line-height-tight)] font-bold',
      heading4: 'text-[var(--font-size-2xl)]/[var(--line-height-tight)] font-bold',
      heading4Semibold: 'text-[var(--font-size-2xl)]/[var(--line-height-tight)] font-semibold',
      heading5: 'text-[var(--font-size-md)]/[var(--line-height-relaxed)] font-semibold',
      title1: 'text-[var(--font-size-xl)]/[var(--line-height-normal)] font-bold',
      title1Semibold: 'text-[var(--font-size-xl)]/[var(--line-height-normal)] font-semibold',
      title2: 'text-[var(--font-size-lg)]/[var(--line-height-normal)] font-semibold',
      title3: 'text-[var(--font-size-base)]/[var(--line-height-relaxed)] font-semibold',
      body1: 'text-[var(--font-size-xl)]/[var(--line-height-relaxed)] font-normal',
      body2: 'text-[var(--font-size-base)]/[var(--line-height-relaxed)] font-normal',
      body3: 'text-[var(--font-size-md)]/[var(--line-height-relaxed)] font-normal',
      body4: 'text-[var(--font-size-sm)]/[var(--line-height-relaxed)] font-normal',
      body4Medium: 'text-[var(--font-size-sm)]/[var(--line-height-relaxed)] font-medium',
    },
    color: {
      primary: 'text-text-token-primary',
      secondary: 'text-text-token-secondary',
      tertiary: 'text-text-token-tertiary',
      accent: 'text-text-token-accent',
      danger: 'text-text-token-danger',
      inverse: 'text-text-token-inverse',
    },
  },
  defaultVariants: {
    variant: 'body2',
    color: 'primary',
  },
});

export type TypographyVariants = VariantProps<typeof typographyVariants>;

type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';

const defaultElementMap: Record<NonNullable<TypographyVariants['variant']>, TypographyElement> = {
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading4Semibold: 'h4',
  heading5: 'h5',
  title1: 'h6',
  title1Semibold: 'h6',
  title2: 'h6',
  title3: 'h6',
  body1: 'p',
  body2: 'p',
  body3: 'p',
  body4: 'p',
  body4Medium: 'p',
};

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    TypographyVariants {
  as?: TypographyElement;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'body2', color, as, children, ...props }, ref) => {
    const variantKey = variant ?? 'body2';
    const Component = as ?? defaultElementMap[variantKey];
    return React.createElement(
      Component,
      {
        ref,
        className: cn(typographyVariants({ variant, color, className })),
        ...props,
      },
      children
    );
  }
);
Typography.displayName = 'Typography';

export { Typography, typographyVariants };
