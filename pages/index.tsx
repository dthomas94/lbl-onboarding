import { Box, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="top">
      <Heading>Welcome to the Currency App!</Heading>
    </Box>
  );
};

export default Home;
