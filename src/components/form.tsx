import { Loader } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { withMask } from 'use-mask-input';

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
          })}
          error={errors.confirmPassword?.message as string}
        />
      </Label>

      <Label>
        Número de celular:
        <Input
          type='text'
          {...register('cellphone', {
            required: 'Esse campo precisa ser preenchido',
          })}
          ref={withMask('(99) 99999-9999')}
          error={errors.cellphone?.message as string}
        />
      </Label>

      <Label>
        CPF:
        <Input
          type='text'
          {...register('cpf', {
            required: 'Esse campo precisa ser preenchido',
          })}
          ref={withMask('999.999.999-99')}
          error={errors.cpf?.message as string}
        />
      </Label>

      <Label>
        CEP:
        <Input
          type='text'
          {...register('zipcode', {
            required: 'Esse campo precisa ser preenchido',
          })}
          ref={withMask('99999-999')}
          onBlur={handleZipCodeBlur}
          error={errors.zipcode?.message as string}
        />
      </Label>

      <Label>
        Endereço:
        <Input
          type='text'
          value={address.street}
          readOnly
          {...register('street', {
            required: 'Esse campo precisa ser preenchido',
          })}
          error={errors.street?.message as string}
        />
      </Label>

      <Label>
        Cidade:
        <Input
          type='text'
          value={address.city}
          readOnly
          {...register('city', {
            required: 'Esse campo precisa ser preenchido',
          })}
          error={errors.city?.message as string}
        />
      </Label>

      <Button disabled={isSubmitting} className='mt-4'>
        {isSubmitting ? <Loader className='animate-spin' /> : 'Cadastrar'}
      </Button>
    </form>
  );
}
