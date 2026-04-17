import * as React from 'react';

import { cn } from '@/shared/utils/tw-utils';

/* ── Context ───────────────────────────────────────────────────── */

interface FormFieldContextValue {
  id: string;
  error?: string;
  required?: boolean;
  descriptionId: string;
  errorId: string;
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

function useFormField() {
  const ctx = React.useContext(FormFieldContext);
  if (!ctx) {
    throw new Error('FormField 하위 컴포넌트는 FormField 내부에서만 사용할 수 있습니다.');
  }
  return ctx;
}

/* ── Root ──────────────────────────────────────────────────────── */

interface FormFieldRootProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: string;
  required?: boolean;
}

const FormFieldRoot = React.forwardRef<HTMLDivElement, FormFieldRootProps>(
  ({ className, error, required, children, ...props }, ref) => {
    const id = React.useId();
    const descriptionId = `${id}-description`;
    const errorId = `${id}-error`;

    return (
      <FormFieldContext.Provider value={{ id, error, required, descriptionId, errorId }}>
        <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props}>
          {children}
        </div>
      </FormFieldContext.Provider>
    );
  }
);
FormFieldRoot.displayName = 'FormField';

/* ── Label ─────────────────────────────────────────────────────── */

const FormFieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, children, ...props }, ref) => {
  const { id, required } = useFormField();
  return (
    <label
      ref={ref}
      htmlFor={id}
      className={cn(
        'text-[var(--font-size-base)]/[var(--line-height-relaxed)] font-semibold text-text-token-primary',
        className
      )}
      {...props}>
      {children}
      {required && (
        <span className='ml-0.5 text-text-token-danger' aria-hidden='true'>
          *
        </span>
      )}
    </label>
  );
});
FormFieldLabel.displayName = 'FormFieldLabel';

/* ── Control ───────────────────────────────────────────────────── */

const FormFieldControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { id, error, descriptionId, errorId } = useFormField();

  return (
    <div ref={ref} className={cn(className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
            id,
            'aria-invalid': !!error,
            'aria-describedby': error ? errorId : descriptionId,
          });
        }
        return child;
      })}
    </div>
  );
});
FormFieldControl.displayName = 'FormFieldControl';

/* ── Description ───────────────────────────────────────────────── */

const FormFieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { descriptionId } = useFormField();
  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn(
        'text-[var(--font-size-sm)]/[var(--line-height-relaxed)] text-text-token-secondary',
        className
      )}
      {...props}
    />
  );
});
FormFieldDescription.displayName = 'FormFieldDescription';

/* ── Error ─────────────────────────────────────────────────────── */

const FormFieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, errorId } = useFormField();
  if (!error) return null;

  return (
    <p
      ref={ref}
      id={errorId}
      role='alert'
      className={cn(
        'text-[var(--font-size-sm)]/[var(--line-height-relaxed)] text-text-token-danger',
        className
      )}
      {...props}>
      {children ?? error}
    </p>
  );
});
FormFieldError.displayName = 'FormFieldError';

/* ── Compose ───────────────────────────────────────────────────── */

const FormField = Object.assign(FormFieldRoot, {
  Label: FormFieldLabel,
  Control: FormFieldControl,
  Description: FormFieldDescription,
  Error: FormFieldError,
});

export { FormField, useFormField };
