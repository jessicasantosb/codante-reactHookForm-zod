import { Loader } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';

import { getZipCodeInfo } from '../services/getZipCodeInfo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function Form() {
  const [address, setAddress] = useState({ street: '', city: '' });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const registerWithMask = useHookFormMask(register);

  const handleZipCodeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const zipcode = e.target.value;
    getZipCodeInfo(zipcode, setAddress);
  };

  const onSubmit = async (data: FieldValues) => {
    const response = await fetch(
      'https://apis.codante.io/api/register-user/register',
      { method: 'POST', body: JSON.stringify(data) },
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
          error={errors.name?.message as string}
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
          error={errors.email?.message as string}
        />
      </Label>

      <Label>
        Senha:
        <Input
          id='password'
          {...register('password', {
            required: 'Esse campo precisa ser preenchido',
            minLength: {
              value: 6,
              message: 'A senha deve ter no mínimo 6 caracteres',
            },
          })}
          error={errors.password?.message as string}
        />
      </Label>

      <Label>
        Confirmar senha:
        <Input
          id='password'
          {...register('confirmPassword', {
            required: 'Esse campo precisa ser preenchido',
            minLength: {
              value: 6,
              message: 'A confirmação de senha deve ter no mínimo 6 caracteres',
            },
          })}
          error={errors.confirmPassword?.message as string}
        />
      </Label>

      <Label>
        Número de celular:
        <Input
          type='text'
          {...registerWithMask('cellphone', '(99) 99999-9999', {
            required: 'Esse campo precisa ser preenchido',
            pattern: {
              value: /^\(\d{2}\) \d{5}-\d{4}$/,
              message: 'Número de celular inválido',
            },
          })}
          error={errors.cellphone?.message as string}
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
          error={errors.cpf?.message as string}
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
          error={errors.zipcode?.message as string}
        />
      </Label>

      <Label>
        Endereço:
        <Input type='text' value={address.street} readOnly />
      </Label>

      <Label>
        Cidade:
        <Input type='text' value={address.city} readOnly />
      </Label>

      <Button disabled={isSubmitting} className='mt-4'>
        {isSubmitting ? <Loader className='animate-spin' /> : 'Cadastrar'}
      </Button>
    </form>
  );
}
