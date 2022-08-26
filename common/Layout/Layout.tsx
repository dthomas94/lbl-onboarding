import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useUserStore } from "../../store/user";
import Login from "../Login";
import Logout from "../Logout";
import { StyledLayout } from "./Layout.css";

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

export const Layout = ({
  children,
}: {
  children: ReactElement;
}): JSX.Element => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const hasHydrated = useHasHydrated();

  useEffect(() => {
    if (!user.loggedIn && hasHydrated) {
      router.push("/");
    }

    if (user.loggedIn && hasHydrated && router.pathname !== "currency") {
      router.push("/currency");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated, user.loggedIn]);

  return (
    <StyledLayout>
      <Head>
        <title>Onboarding - LBL</title>
        <meta name="description" content="Fun little app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as={"main"} height="100%">
        <Box>{hasHydrated && user.loggedIn ? <Logout /> : <Login />}</Box>
        {children}
      </Box>
    </StyledLayout>
  );
};
