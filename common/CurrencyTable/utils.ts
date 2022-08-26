export const getCurrencies = async () => {
  const res = await fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
  );
  const currencies: object = await res.json();

  return currencies;
};

export const convertCurrencies = async (
  currencyCodeFrom: string,
  currencyCodeTo: string
) => {
  const data = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyCodeFrom}/${currencyCodeTo}.json`
  ).then((res) => res.json());

  return data[currencyCodeTo];
};
