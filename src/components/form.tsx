import { Loader } from 'lucide-react';
import { FieldValues, useForm } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';

import { ErrorMessage } from '@hookform/error-message';
import { getZipCodeInfo } from '../services/getZipCodeInfo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm();

  const registerWithMask = useHookFormMask(register);

  const handleZipCodeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const zipcode = e.target.value;
    getZipCodeInfo(zipcode, setValue);
  };

  const onSubmit = async (data: FieldValues) => {
    const response = await fetch(
      'https://apis.codante.io/api/register-user/register',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    console.log(result);
  };

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
          type='text'
          {...register('name', {
            required: 'Esse campo precisa ser preenchido',
            maxLength: {
              value: 255,
              message: 'O nome deve ter no máximo 255 caracteres',
            },
          })}
          error={<ErrorMessage errors={errors} name='name' />}
        />
      </Label>
      <Label>
        Email:
        <Input
          type='email'
          {...register('email', {
            required: 'Esse campo precisa ser preenchido',
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Email inválido',
            },
          })}
          error={<ErrorMessage errors={errors} name='email' />}
        />
      </Label>
      <Label>
        Senha:
        <Input
          id='password'
          {...register('password', {
            required: 'Esse campo precisa ser preenchido',
            minLength: {
              value: 8,
              message: 'A senha deve ter no mínimo 8 caracteres',
            },
          })}
          error={<ErrorMessage errors={errors} name='password' />}
        />
      </Label>
      <Label>
        Confirmar senha:
        <Input
          id='password'
          {...register('password_confirmation', {
            required: 'Esse campo precisa ser preenchido',
            minLength: {
              value: 8,
              message: 'A confirmação de senha deve ter no mínimo 8 caracteres',
            },
            validate(value, formValues) {
              if (value === formValues.password) return true;
              return 'As senhas devem coincidir';
            },
          })}
          error={<ErrorMessage errors={errors} name='password_confirmation' />}
        />
      </Label>
      <Label>
        Número de celular:
        <Input
          type='text'
          {...registerWithMask('phone', '(99) 99999-9999', {
            required: 'Esse campo precisa ser preenchido',
            pattern: {
              value: /^\(\d{2}\) \d{5}-\d{4}$/,
              message: 'Número de celular inválido',
            },
          })}
          error={<ErrorMessage errors={errors} name='cellphone' />}
        />
      </Label>
      <Label>
        CPF:
        <Input
          type='text'
          {...registerWithMask('cpf', '999.999.999-99', {
            required: 'Esse campo precisa ser preenchido',
            pattern: {
              value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
              message: 'CPF inválido',
            },
          })}
          error={<ErrorMessage errors={errors} name='cpf' />}
        />
      </Label>
      <Label>
        CEP:
        <Input
          type='text'
          {...registerWithMask('zipcode', '99999-999', {
            required: 'Esse campo precisa ser preenchido',
            pattern: {
              value: /^\d{5}-\d{3}$/,
              message: 'CEP inválido',
            },
          })}
          onBlur={handleZipCodeBlur}
          error={<ErrorMessage errors={errors} name='zipcode' />}
        />
      </Label>
      <Label>
        Endereço:
        <Input type='text' {...register('address')} readOnly />
      </Label>
      <Label>
        Cidade:
        <Input type='text' {...register('city')} readOnly />
      </Label>

      <div>
        <div className='flex items-center'>
          <Input
            type='checkbox'
            id='checkbox'
            className='mr-2 accent-[#4C4B16]'
            {...register('terms', {
              required: 'Os termos e condições devem ser aceitos',
            })}
          />
          <Label className='text-sm  font-light text-slate-500 inline'>
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
