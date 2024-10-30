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

    setAddress({
      street: `${data.street} - ${data.neighborhood}`,
      city: `${data.city}/${data.state}`,
    });
  } catch (error) {
    console.error(error);
  }
};
