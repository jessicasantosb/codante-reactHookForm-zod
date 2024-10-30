import { cn } from '../../lib/utils';
import { InputProps } from '../../utils/types';

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'h-8 p-2 rounded-sm border border-[#4C4B16] ring-offset-[#4C4B16] placeholder:text-[#4C4B16] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4C4B16] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}
