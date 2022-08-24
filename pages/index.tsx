import type { NextPage } from "next";
import Head from "next/head";
import { Box, Button } from "@chakra-ui/react";
import { useUserStore } from "../store/user";
import { Currency } from "./Currency";

const Home: NextPage = () => {
  const login = useUserStore((state) => state.login);
  const user = useUserStore((state) => state.user);

  return (
    <div>
      <Head>
        <title>Onboarding - LBL</title>
        <meta name="description" content="Fun little app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {user.loggedIn ? (
          <Currency />
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
