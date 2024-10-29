import { ComponentPropsWithRef } from 'react';
import { cn } from '../../lib/utils';

type LabelProps = ComponentPropsWithRef<'label'>;

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <label className={cn('flex flex-col', className)} {...props}>
      {children}
    </label>
  );
}
