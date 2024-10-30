export const getZipCodeInfo = async (
  zipcode: string,
  setAddress: React.Dispatch<
    React.SetStateAction<{
      street: string;
      city: string;
    }>
  >,
) => {
  try {
    const response = await fetch(
      `https://brasilapi.com.br/api/cep/v2/${zipcode}`,
    );

    if (!response.ok) {
      return setAddress({
        street: 'Não encontrado',
        city: 'Não encontrado',
      });
    }

    const data = await response.json();

    const streetName =
      ((!data.street || !data.neighborhood) && 'Não encontrado') ||
      `${data.street} - ${data.neighborhood}`;

    const cityName =
      ((!data.city || !data.state) && 'Não encontrado') ||
      `${data.city} - ${data.state}`;

    setAddress({ street: streetName, city: cityName });
  } catch (error) {
    console.error(error);
  }
};
