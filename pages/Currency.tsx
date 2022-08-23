import { Box, Heading, Highlight } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CurrencyTable } from "../common/CurrencyTable/CurrencyTable";
import { convertCurrencies } from "../common/CurrencyTable/utils";

interface SelectedCurrencies {
  currencyFrom: { code: string };
  currencyTo: { code: string };
}

export const Currency = () => {
  const router = useRouter();
  const [selectedCurrencies, selectCurrencies] = useState<SelectedCurrencies>({
    currencyFrom: { code: (router.query.currencyFrom as string) || "" },
    currencyTo: { code: (router.query.currencyTo as string) || "" },
  });
  const [convertedValue, setConvertedValue] = useState<number>(0);

  const deselectCurrency = (isFrom: boolean = false) => {
    const dir = isFrom ? "currencyFrom" : "currencyTo";
    selectCurrencies({
      ...selectedCurrencies,
      [dir]: { code: "" },
    });
    router.push({ query: { ...router.query, [dir]: "" } });
  };

  const selectCurrency = (code: string, isFrom: boolean = false) => {
    const dir = isFrom ? "currencyFrom" : "currencyTo";
    selectCurrencies({
      ...selectedCurrencies,
      [dir]: { code },
    });
    router.push({
      query: { ...router.query, [dir]: code },
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
      selectCurrency(currencyCode, true);
    } else if (!selectedCurrencies.currencyTo.code) {
      selectCurrency(currencyCode);
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
