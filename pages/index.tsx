import type { NextPage } from "next";
import Head from "next/head";
import { Button } from "@chakra-ui/react";
import { useUserStore } from "../store/user";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const login = useUserStore((state) => state.login);
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user.loggedIn) {
      router.push("/currency");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogin = () => {
    login();
    router.push("/currency");
  };

  return (
    <div>
      <Head>
        <title>Onboarding - LBL</title>
        <meta name="description" content="Fun little app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Button colorScheme="blue" onClick={onLogin}>
          Login
        </Button>
      </main>
    </div>
  );
};

export default Home;
