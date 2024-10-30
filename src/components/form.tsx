import { withMask } from 'use-mask-input';

import { useState } from 'react';
import { getZipCodeInfo } from '../services/getZipCodeInfo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function Form() {
  const [address, setAddress] = useState({ street: '', city: '' });
  
  const handleZipCodeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const zipcode = e.target.value;
    getZipCodeInfo(zipcode, setAddress);
  };

  return (
    <form className='relative max-w-[500px] mx-auto border-2 border-[#4C4B16] bg-white rounded-sm flex flex-col gap-4 p-10'>
      <h3 className='pb-4 text-2xl text-center text-[#4C4B16] font-bold tracking-wider'>
        Formulário Dinâmico
      </h3>

      <Label>
        Nome completo:
        <Input type='text' />
      </Label>

      <Label>
        Email:
        <Input type='email' />
      </Label>

      <Label>
        Senha:
        <Input id='password' />
      </Label>

      <Label>
        Confirmar senha:
        <Input id='password' />
      </Label>

      <Label>
        Número de celular:
        <Input type='text' ref={withMask('(99) 99999-9999')} />
      </Label>

      <Label>
        CPF:
        <Input type='text' ref={withMask('999.999.999-99')} />
      </Label>

      <Label>
        CEP:
        <Input
          type='text'
          ref={withMask('99999-999')}
          onBlur={handleZipCodeBlur}
        />
      </Label>

      <Label>
        Endereço:
        <Input
          type='text'
          value={address.street}
          readOnly
        />
      </Label>

      <Label>
        Cidade:
        <Input type='text' value={address.city} readOnly />
      </Label>

      <Button className='mt-4'>Cadastrar</Button>
    </form>
  );
}
