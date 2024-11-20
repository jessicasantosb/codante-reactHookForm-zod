import { UseFormSetValue } from 'react-hook-form';
import { UserRegister } from '../schema';

export const getZipCodeInfo = async (
  zipcode: string,
  setValue: UseFormSetValue<UserRegister>,
) => {
  try {
    const response = await fetch(
      `https://brasilapi.com.br/api/cep/v2/${zipcode}`,
    );

    if (!response.ok) {
      setValue('address', 'Não encontrado');
      setValue('city', 'Não encontrado');
    }

    const data = await response.json();

    const streetName =
      ((!data.street || !data.neighborhood) && 'Não encontrado') ||
      `${data.street} - ${data.neighborhood}`;

    const cityName =
      ((!data.city || !data.state) && 'Não encontrado') ||
      `${data.city} - ${data.state}`;

    setValue('address', streetName);
    setValue('city', cityName);
  } catch (error) {
    console.error(error);
  }
};
