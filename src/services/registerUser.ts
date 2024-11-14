import { FieldValues, UseFormSetError } from 'react-hook-form';

export const registerUser = async (
  data: FieldValues,
  setError: UseFormSetError<FieldValues>,
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
      setError(field, { type: 'manual', message: result.errors[field] });
  } else {
    console.log(result);
  }
};
