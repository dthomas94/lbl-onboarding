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
import { URLSearchParams } from "url";
interface SelectedCurrencies {
  currencyFrom: { code: string };
  currencyTo: { code: string };
}

const asyncConvertCurrencies = async (
  from: string,
  to: string,
  callback?: (value: number) => void
) => {
  const res = await convertCurrencies(from, to);

  if (callback) callback(res.toString());
};

export async function getServerSideProps(ctx: {
  query: { currencyFrom: string; currencyTo: string };
}) {
  const value = asyncConvertCurrencies(
    ctx.query.currencyFrom,
    ctx.query.currencyTo
  );

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

  const deselectCurrency = (isFrom: boolean = false) => {
    const dir = isFrom ? "currencyFrom" : "currencyTo";
    selectCurrencies({
      ...selectedCurrencies,
      [dir]: { code: "" },
    });
  };

  const selectCurrency = (code: string, isFrom: boolean = false) => {
    const dir = isFrom ? "currencyFrom" : "currencyTo";
    selectCurrencies({
      ...selectedCurrencies,
      [dir]: { code },
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

  const reverseCurrencies = () => {
    selectCurrencies({
      currencyFrom: { ...selectedCurrencies.currencyTo },
      currencyTo: { ...selectedCurrencies.currencyFrom },
    });
  };

  useEffect(() => {
    const { currencyFrom, currencyTo } = selectedCurrencies;
    if (currencyFrom.code && currencyTo.code) {
      asyncConvertCurrencies(currencyFrom.code, currencyTo.code, (res) =>
        setConvertedValue(res)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { currencyFrom, currencyTo } = selectedCurrencies;

    router.push({
      query: { currencyFrom: currencyFrom.code, currencyTo: currencyTo.code },
    });

    if (currencyFrom.code && currencyTo.code) {
      asyncConvertCurrencies(currencyFrom.code, currencyTo.code, (res) =>
        setConvertedValue(res)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrencies]);

  return (
    <Box
      display="flex"
      flexDir="column"
      padding="10"
      height="100vh"
      overflow="hidden"
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
