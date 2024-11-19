import { FieldValues, UseFormSetError } from 'react-hook-form';
import { UserRegister } from '../schema';

export const registerUser = async (
  data: FieldValues,
  setError: UseFormSetError<{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    cpf: string;
    zipcode: string;
    address: string;
    city: string;
    terms: boolean;
  }>,
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
  } else {
    console.log(result);
  }
};
