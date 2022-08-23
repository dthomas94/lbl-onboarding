import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import { useEffect, useState } from "react";
import { getCurrencies } from "./utils";

export const CurrencyTable = () => {
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    async function asyncGetCurrencies() {
      const res = await getCurrencies();

      setCurrencies(res);
    }

    asyncGetCurrencies();
  }, []);

  return (
    <TableContainer>
      <Table variant="striped">
        <TableCaption>Currencies</TableCaption>
        <Thead>
          <Tr>
            <Th>Code</Th>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(currencies).map(([key, val]) => (
            <Tr key={key}>
              <Td>{key}</Td>
              <Td>{val}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Code</Th>
            <Th>Name</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
