import { Box, Heading, Highlight } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CurrencyTable } from "../common/CurrencyTable/CurrencyTable";
import { convertCurrencies } from "../common/CurrencyTable/utils";

interface SelectedCurrencies {
  currencyFrom: { code: string; index: number | null };
  currencyTo: { code: string; index: number | null };
}

export const Currency = () => {
  const [selectedCurrencies, selectCurrencies] = useState<SelectedCurrencies>({
    currencyFrom: { code: "", index: null },
    currencyTo: { code: "", index: null },
  });
  const [convertedValue, setConvertedValue] = useState<number>(0);

  const deselectCurrency = (isFrom: boolean = false) => {
    selectCurrencies({
      ...selectedCurrencies,
      [isFrom ? "currencyFrom" : "currencyTo"]: { code: "", index: null },
    });
  };

  const selectCurrency = (
    code: string,
    index: number,
    isFrom: boolean = false
  ) => {
    selectCurrencies({
      ...selectedCurrencies,
      [isFrom ? "currencyFrom" : "currencyTo"]: { code, index },
    });
  };

  const updateCurrencies = (currencyCode: string, index: number) => {
    if (selectedCurrencies.currencyFrom.code === currencyCode) {
      deselectCurrency(true);
      return;
    } else if (selectedCurrencies.currencyTo.code === currencyCode) {
      deselectCurrency();
      return;
    }

    if (!selectedCurrencies.currencyFrom.code) {
      selectCurrency(currencyCode, index, true);
    } else if (!selectedCurrencies.currencyTo.code) {
      selectCurrency(currencyCode, index);
    }
  };

  useEffect(() => {
    const { currencyFrom, currencyTo } = selectedCurrencies;
    async function asyncConvertCurrencies() {
      const res = await convertCurrencies(currencyFrom.code, currencyTo.code);

      setConvertedValue(res);
    }

    if (currencyFrom.code && currencyTo.code) {
      asyncConvertCurrencies();
    }
  }, [selectedCurrencies]);

  return (
    <Box>
      <Heading lineHeight="tall">
        <Highlight
          query="spotlight"
          styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
        >
          {convertedValue?.toString()}
        </Highlight>
      </Heading>
      <CurrencyTable onRowClick={updateCurrencies} />
    </Box>
  );
};
