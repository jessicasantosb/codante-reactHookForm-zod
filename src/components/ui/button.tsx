import { cn } from '../../lib/utils';
import { ButtonProps } from '../../utils/types';

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={cn('', className)} {...props}>
      {children}
    </button>
  );
}
