import { cn } from '../../lib/utils';
import { InputProps } from '../../utils/types';

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'h-8 p-2 rounded-sm border border-slate-400 ring-offset-slate-400 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}
