import { EyeIcon, EyeOff } from 'lucide-react';
import { ComponentPropsWithRef, forwardRef, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

type InputProps = ComponentPropsWithRef<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, ...props }, ref) => {
    const [isPassword, setIsPassword] = useState(false);
    const [type, setType] = useState<'password' | 'text'>();

    const handleEyeIcon = () => {
      setType(type === 'password' ? 'text' : 'password');
    };

    useEffect(() => {
      if (id === 'password') {
        setIsPassword(true);
        setType('password');
      }
    }, []);

    return (
      <div className='flex justify-between border border-[#4C4B16] group focus-within:outline outline-2'>
        <input
          ref={ref}
          type={type}
          className={cn(
            ' w-full h-8 p-2 rounded-sm outline-none placeholder:text-[#4C4B16] disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...props}
        />

        <button
          type='button'
          onClick={handleEyeIcon}
          className={isPassword ? 'p-1 text-[#4C4B16]' : 'hidden'}>
          {type === 'password' ? <EyeIcon /> : <EyeOff />}
        </button>
      </div>
    );
  },
);
