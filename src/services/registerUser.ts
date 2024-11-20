import { FieldValues, UseFormReset, UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
import { UserRegister } from '../schema';

export const registerUser = async (
  data: FieldValues,
  setError: UseFormSetError<UserRegister>,
  reset: UseFormReset<UserRegister>,
) => {
  const response = await fetch(
    'https://apis.codante.io/api/register-user/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    for (const field in result.errors)
      setError(field as keyof UserRegister, {
        type: 'manual',
        message: result.errors[field],
      });
    toast.error('Error ao cadastrar o usuário.');
  } else {
    toast.success('Usuário cadastrado com sucesso!');
    reset();
  }
};
