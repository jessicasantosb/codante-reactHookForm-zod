import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function Form() {
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
        <Input type='password' />
      </Label>

      <Label>
        Confirmar senha:
        <Input type='password' />
      </Label>

      <Label>
        Número de celular:
        <Input type='text' />
      </Label>

      <Label>
        CPF:
        <Input type='text' />
      </Label>

      <Label>
        CEP:
        <Input type='text' />
      </Label>

      <Label>
        Endereço:
        <Input type='text' />
      </Label>

      <Label>
        Cidade:
        <Input type='text' />
      </Label>

      <Button className='mt-4'>Cadastrar</Button>
    </form>
  );
}
