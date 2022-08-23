import type { NextPage } from "next";
import Head from "next/head";
import { Button, Heading, Highlight } from "@chakra-ui/react";
import { useUserStore } from "../store/user";
import {
  Currencies,
  Currency,
  CurrencyTable,
} from "../common/CurrencyTable/CurrencyTable";
import { useEffect, useState } from "react";
import { convertCurrencies } from "../common/CurrencyTable/utils";

interface SelectedCurrencies {
  currencyFrom: { code: string; index: number | null };
  currencyTo: { code: string; index: number | null };
}

const Home: NextPage = () => {
  const login = useUserStore((state) => state.login);
  const user = useUserStore((state) => state.user);
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
    <div>
      <Head>
        <title>Onboarding - LBL</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {user.loggedIn ? (
          <>
            <Heading lineHeight="tall">
              <Highlight
                query="spotlight"
                styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
              >
                {convertedValue?.toString()}
              </Highlight>
            </Heading>
            <CurrencyTable onRowClick={updateCurrencies} />
          </>
        ) : (
          <Button colorScheme="blue" onClick={login}>
            Login
          </Button>
        )}
      </main>
    </div>
  );
};

export default Home;
