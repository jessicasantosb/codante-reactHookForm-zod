import { ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';

type LabelProps = ComponentPropsWithRef<'label'>;

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <label className={twMerge('flex flex-col', className)} {...props}>
      {children}
    </label>
  );
}
