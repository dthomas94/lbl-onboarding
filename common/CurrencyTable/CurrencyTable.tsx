import { Box, Button, ButtonGroup, Input } from "@chakra-ui/react";
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

interface CurrencyTableProps {
  onRowClick: (currencyCode: string, index: number) => void;
}

export type Currency = Array<string>;

export type Currencies = Array<Currency>;

export const CurrencyTable = ({ onRowClick }: CurrencyTableProps) => {
  const [currencies, setCurrencies] = useState<Currencies>([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currencies>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginatedCurrencies, setPaginatedCurrencies] = useState<Currencies>(
    []
  );
  const [searchVal, setSearchVal] = useState<string>("");

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
    paginate(filteredCurrencies, pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  useEffect(() => {
    if (searchVal) {
      const filteredCurrencies = currencies.filter(
        ([code, name]) => code.includes(searchVal) || name.includes(searchVal)
      );
      setFilteredCurrencies(filteredCurrencies);
      paginate(filteredCurrencies, 1)
    } else {
      setFilteredCurrencies(currencies);
      paginate(currencies, 1)
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal]);

  return (
    <Box height="100%" overflow="scroll">
      <Input
        type="text"
        value={searchVal}
        onChange={(evt) => setSearchVal(evt.target.value)}
        placeholder="Try 'jpy'"
      />
      <TableContainer height="90%" overflowY="scroll">
        <Table variant="striped">
          <TableCaption>Currencies</TableCaption>
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedCurrencies.length ? (
              paginatedCurrencies.map(([key, val], index) => (
                <Tr key={key} onClick={() => onRowClick(key, index)}>
                  <Td>{key}</Td>
                  <Td>{val}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td>No results found</Td>
                <Td></Td>
              </Tr>
            )}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Code</Th>
              <Th>Name</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <ButtonGroup
        display="flex"
        justifyContent="center"
        columnGap="5"
        marginTop="15"
      >
        <Button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Prev
        </Button>
        <Button
          disabled={filteredCurrencies.length / 20 <= pageNumber}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next
        </Button>
      </ButtonGroup>
    </Box>
  );
};
