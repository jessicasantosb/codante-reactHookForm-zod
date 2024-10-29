import { cn } from '../../lib/utils';
import { ButtonProps } from '../../utils/types';

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'w-full h-8 px-2 bg-slate-300 shadow-sm shadow-black hover:scale-95 hover:shadow-none',
        className,
      )}
      {...props}>
      {children}
    </button>
  );
}
