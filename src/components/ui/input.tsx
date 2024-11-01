import { EyeIcon, EyeOff } from 'lucide-react';
import { ComponentPropsWithRef, forwardRef, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

type InputProps = ComponentPropsWithRef<'input'> & { error?: string };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, error, ...props }, ref) => {
    const [isPassword, setIsPassword] = useState(false);
    const [type, setType] = useState<'password' | 'text'>();

    const handleEyeIcon = () => {
      setType(type === 'password' ? 'text' : 'password');
    };

    const checkboxStyle =
      id === 'checkbox' && 'focus-within:outline-none outline-none border-none';

    useEffect(() => {
      if (id === 'password') {
        setIsPassword(true);
        setType('password');
      }
    }, []);

    return (
      <>
        <div
          className={`flex justify-between rounded-sm border outline-2 group outline-[#4C4B16] focus-within:outline ${checkboxStyle}`}>
          <input
            ref={ref}
            type={type}
            className={cn(
              ' w-full h-8 p-2 rounded-sm outline-none placeholder:text-[#4C4B16] disabled:cursor-not-allowed disabled:opacity-50 read-only:bg-gray-100',
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

        <p className='text-red-400 text-xs mt-1 h-1 select-none'>{error}</p>
      </>
    );
  },
);
