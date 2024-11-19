import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { FieldValues, useForm } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';

import type { UserRegister } from '../schema';
import { userRegisterSchema } from '../schema';
import { getZipCodeInfo } from '../services/getZipCodeInfo';
import { registerUser } from '../services/registerUser';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<UserRegister>({ resolver: zodResolver(userRegisterSchema) });
  const registerWithMask = useHookFormMask(register);

  const handleZipCodeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const zipcode = e.target.value;
    getZipCodeInfo(zipcode, setValue);
  };

  const onSubmit = async (data: FieldValues) => registerUser(data, setError);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='relative max-w-[500px] mx-auto border-2 border-[#4C4B16] bg-white rounded-sm flex flex-col gap-4 p-10'>
      <h3 className='pb-4 text-2xl text-center text-[#4C4B16] font-bold tracking-wider'>
        Formulário Dinâmico
      </h3>
      <Label>
        Nome completo:
        <Input
          {...register('name')}
          error={<ErrorMessage errors={errors} name='name' />}
        />
      </Label>
      <Label>
        Email:
        <Input
          type='email'
          {...register('email')}
          error={<ErrorMessage errors={errors} name='email' />}
        />
      </Label>
      <Label>
        Senha:
        <Input
          type='password'
          {...register('password')}
          error={<ErrorMessage errors={errors} name='password' />}
        />
      </Label>
      <Label>
        Confirmar senha:
        <Input
          type='password'
          {...register('password_confirmation')}
          error={<ErrorMessage errors={errors} name='password_confirmation' />}
        />
      </Label>
      <Label>
        Número de celular:
        <Input
          {...registerWithMask('phone', '(99) 99999-9999')}
          error={<ErrorMessage errors={errors} name='phone' />}
        />
      </Label>
      <Label>
        CPF:
        <Input
          {...registerWithMask('cpf', '999.999.999-99')}
          error={<ErrorMessage errors={errors} name='cpf' />}
        />
      </Label>
      <Label>
        CEP:
        <Input
          {...registerWithMask('zipcode', '99999-999')}
          onBlur={handleZipCodeBlur}
          error={<ErrorMessage errors={errors} name='zipcode' />}
        />
      </Label>
      <Label>
        Endereço:
        <Input {...register('address')} readOnly />
      </Label>
      <Label>
        Cidade:
        <Input {...register('city')} readOnly />
      </Label>

      <div>
        <div className='flex items-center'>
          <Input
            type='checkbox'
            className='mr-2 accent-[#4C4B16]'
            {...register('terms')}
          />
          <Label className='text-sm font-light text-slate-500 inline'>
            Aceito os{' '}
            <span className='underline hover:text-slate-900 cursor-pointer'>
              termos e condições
            </span>
          </Label>
        </div>
        <p className='text-red-400 text-xs h-4 select-none'>
          <ErrorMessage errors={errors} name='terms' />
        </p>
      </div>

      <Button disabled={isSubmitting} className='mt-4'>
        {isSubmitting ? <Loader className='animate-spin' /> : 'Cadastrar'}
      </Button>
    </form>
  );
}
