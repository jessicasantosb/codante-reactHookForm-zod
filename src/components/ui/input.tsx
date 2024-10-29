import { cn } from '../../lib/utils';
import { InputProps } from '../../utils/types';

export function Input({ className, ...props }: InputProps) {
  return <input className={cn('', className)} {...props} />;
}
