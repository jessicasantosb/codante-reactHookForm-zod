import { ErrorMessage } from '@hookform/error-message';
import { EyeIcon, EyeOff } from 'lucide-react';
import { ComponentPropsWithRef, forwardRef, useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { UserRegister } from '../../schema';

type InputProps = ComponentPropsWithRef<'input'> & {
  errors?: FieldErrors<UserRegister>;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', errors, ...props }, ref) => {
    const [inputType, setInputType] = useState<string | undefined>(type);

    const handleEyeIcon = () => {
      setInputType(inputType === 'password' ? 'text' : 'password');
    };

    const outlineStyle =
      type === 'checkbox'
        ? 'focus-within:outline-none outline-none'
        : 'border outline-2 outline-[#4C4B16] focus-within:outline';

    return (
      <>
        <div
          className={`flex justify-between rounded-sm group ${outlineStyle}`}>
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

        {errors && props.name && (
          <p className='text-red-400 text-xs mt-1 h-1 select-none'>
            <ErrorMessage
              errors={errors}
              name={props.name as keyof UserRegister}
            />
          </p>
        )}
      </>
    );
  },
);
