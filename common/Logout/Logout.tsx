import { Button } from "@chakra-ui/react";
import { useUserStore } from "../../store/user";
import { useRouter } from "next/router";

export const Logout = () => {
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();

  const onLogout = () => {
    logout();
    router.push("/");
  };

  return <Button onClick={onLogout}>Logout</Button>;
};
