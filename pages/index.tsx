import type { NextPage } from "next";
import Head from "next/head";
import { Button } from "@chakra-ui/react";
import { useUserStore } from "../store/user";
import {
  Currencies,
  Currency,
  CurrencyTable,
} from "../common/CurrencyTable/CurrencyTable";
import { useState } from "react";

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

  const deselectCurrency = (isFrom: boolean = false) => {
    selectCurrencies({
      ...selectedCurrencies,
      [isFrom ? 'currencyFrom' : 'currencyTo'] : { code: "", index: null },
    });
  }

  const selectCurrency = (code: string, index: number, isFrom: boolean = false) => {
    selectCurrencies({
      ...selectedCurrencies,
      [isFrom ? 'currencyFrom' : 'currencyTo'] : { code, index },
    });
  }

  const updateCurrencies = (currencyCode: string, index: number) => {
    if (selectedCurrencies.currencyFrom.code === currencyCode) {
      deselectCurrency(true)
      return;
    } else if (selectedCurrencies.currencyTo.code === currencyCode) {
      deselectCurrency()
      return;
    }
    console.log("selecting");

    if (!selectedCurrencies.currencyFrom.code) {
      selectCurrency(currencyCode, index, true);
    } else if (!selectedCurrencies.currencyTo.code) {
      selectCurrency(currencyCode, index)
    }
  };

  return (
    <div>
      <Head>
        <title>Onboarding - LBL</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {user.loggedIn ? (
          <CurrencyTable onRowClick={updateCurrencies} />
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
