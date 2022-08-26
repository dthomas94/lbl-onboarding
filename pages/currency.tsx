import {
  Box,
  Heading,
  Highlight,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CurrencyTable } from "../common/CurrencyTable/CurrencyTable";
import { convertCurrencies } from "../common/CurrencyTable/utils";
import { FaExchangeAlt as ReverseArrows } from "react-icons/fa";
interface SelectedCurrencies {
  currencyFrom: { code: string };
  currencyTo: { code: string };
}

export async function getServerSideProps(ctx: {
  query: { currencyFrom: string; currencyTo: string };
}) {
  return {
    props: {
      currencyValue: 0,
    },
  };
}

const Currency = ({ currencyValue }: { currencyValue: number }) => {
  const router = useRouter();
  const [selectedCurrencies, selectCurrencies] = useState<SelectedCurrencies>({
    currencyFrom: { code: (router.query.currencyFrom as string) || "" },
    currencyTo: { code: (router.query.currencyTo as string) || "" },
  });
  const [convertedValue, setConvertedValue] = useState<number>(currencyValue);

  const toggleCurrency = (code: string, isFrom: boolean = false) => {
    const shouldRemove =
      selectedCurrencies.currencyFrom.code === code ||
      selectedCurrencies.currencyTo.code === code;
    const dir = isFrom ? "currencyFrom" : "currencyTo";
    selectCurrencies({
      ...selectedCurrencies,
      [dir]: { code: shouldRemove ? "" : code },
    });
  };

  const updateCurrencies = (code: string) => {
    if (selectedCurrencies.currencyFrom.code === code) {
      toggleCurrency(code, true);
      return;
    }
    if (selectedCurrencies.currencyTo.code === code) {
      toggleCurrency(code);
      return;
    }

    if (!selectedCurrencies.currencyFrom.code) {
      toggleCurrency(code, true);
    } else if (!selectedCurrencies.currencyTo.code) {
      toggleCurrency(code);
    }
  };

  const reverseCurrencies = () => {
    selectCurrencies({
      currencyFrom: { ...selectedCurrencies.currencyTo },
      currencyTo: { ...selectedCurrencies.currencyFrom },
    });
  };

  useEffect(() => {
    const { currencyFrom, currencyTo } = selectedCurrencies;
    router.push({
      query: { currencyFrom: currencyFrom.code, currencyTo: currencyTo.code },
    });

    async function asyncConvertCurrencies() {
      const res = await convertCurrencies(currencyFrom.code, currencyTo.code);

      setConvertedValue(res.toString());
    }
    if (currencyFrom.code && currencyTo.code) {
      asyncConvertCurrencies();
    }
    // router should not be a dependency (see discussion: https://github.com/vercel/next.js/discussions/29403#discussioncomment-1908563)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrencies]);

  return (
    <Box
      display="flex"
      flexDir="column"
      padding="10"
      height="calc(100% - 50px)"
    >
      <Heading
        lineHeight="tall"
        display="flex"
        justifyContent="center"
        flexDir="column"
        alignItems="center"
        rowGap="5"
      >
        <Highlight
          query={[convertedValue?.toString()]}
          styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
        >
          {convertedValue?.toString()}
        </Highlight>
        <Box display="flex" justifyContent="center" alignItems="center" gap="5">
          <Text>{selectedCurrencies.currencyFrom.code}</Text>
          <IconButton
            aria-label="Reverse currencies"
            icon={<ReverseArrows />}
            onClick={reverseCurrencies}
          />
          <Text>{selectedCurrencies.currencyTo.code}</Text>
        </Box>
      </Heading>
      <CurrencyTable onRowClick={updateCurrencies} />
    </Box>
  );
};

export default Currency;
