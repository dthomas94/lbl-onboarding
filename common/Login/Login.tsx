import { Button } from "@chakra-ui/react";
import { useUserStore } from "../../store/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const Login = () => {
  const login = useUserStore((state) => state.login);
  const router = useRouter();

  const onLogin = () => {
    login();
    router.push("/currency");
  };

  return (
    <Button colorScheme="blue" onClick={onLogin}>
      Login
    </Button>
  );
};
