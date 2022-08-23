import { Button, ButtonGroup } from "@chakra-ui/react";
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

type Currencies = Array<Array<string>>;

export const CurrencyTable = () => {
  const [currencies, setCurrencies] = useState<Currencies>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginatedCurrencies, setPaginatedCurrencies] = useState<Currencies>([]);

  const paginate = (arr: Currencies, page: number) => {
    const res = arr.slice((page - 1) * 20, page * 20);
    setPaginatedCurrencies(res);
  };

  useEffect(() => {
    async function asyncGetCurrencies() {
      const res = await getCurrencies();

      const mappedCurrencies = Object.entries(res).map((tuple) => tuple);
      setCurrencies(mappedCurrencies);
      paginate(mappedCurrencies, 1);
    }

    asyncGetCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    paginate(currencies, pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

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
          {paginatedCurrencies.map(([key, val]) => (
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
      <ButtonGroup>
        {pageNumber > 1 && (
          <Button onClick={() => setPageNumber(pageNumber - 1)}>Prev</Button>
        )}
        {currencies.length / 20 > pageNumber && (
          <Button onClick={() => setPageNumber(pageNumber + 1)}>Next</Button>
        )}
      </ButtonGroup>
    </TableContainer>
  );
};
