import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/utils';

type ButtonProps = ComponentPropsWithoutRef<'button'>;

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'w-full h-8 px-2 flex items-center justify-center bg-[#4C4B16] text-white font-bold uppercase shadow-sm shadow-black hover:scale-95 hover:shadow-none disabled:opacity-80',
        className,
      )}
      {...props}>
      {children}
    </button>
  );
}
