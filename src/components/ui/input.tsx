import { EyeIcon, EyeOff } from 'lucide-react';
import { ComponentPropsWithRef, forwardRef, ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = ComponentPropsWithRef<'input'> & {
  error?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, ...props }, ref) => {
    const [inputType, setInputType] = useState<string | undefined>(type);

    const handleEyeIcon = () => {
      setInputType(inputType === 'password' ? 'text' : 'password');
    };

    const checkboxStyle =
      type === 'checkbox' &&
      'focus-within:outline-none outline-none border-none';

    return (
      <>
        <div
          className={`flex justify-between rounded-sm border outline-2 group outline-[#4C4B16] focus-within:outline ${checkboxStyle}`}>
          <input
            ref={ref}
            type={inputType}
            className={twMerge(
              'w-full h-8 p-2 rounded-sm outline-none placeholder:text-[#4C4B16] disabled:cursor-not-allowed disabled:opacity-50 read-only:bg-gray-100',
              className,
            )}
            {...props}
          />

          {type === 'password' && (
            <button
              type='button'
              onClick={handleEyeIcon}
              className='p-1 text-[#4C4B16]'>
              {inputType === 'password' ? <EyeIcon /> : <EyeOff />}
            </button>
          )}
        </div>

        <p className='text-red-400 text-xs mt-1 h-1 select-none'>{error}</p>
      </>
    );
  },
);
