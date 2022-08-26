import { Box } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { getCurrencies } from "./utils";
import { ColumnDef } from "@tanstack/react-table";
import Table from "../Table";
interface CurrencyTableProps {
  onRowClick: (currencyCode: string) => void;
}

export type Currency = { code: string; name: string };

export type Currencies = Array<Currency>;

export const CurrencyTable = ({ onRowClick }: CurrencyTableProps) => {
  const [currencies, setCurrencies] = useState<Currencies>([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currencies>([]);

  const filterCurrencies = (searchVal: string) => {
    if (!searchVal) {
      setFilteredCurrencies(currencies);
    }
    const filteredCurrencies = currencies.filter(
      ({ code, name }) => code.includes(searchVal) || name.includes(searchVal)
    );
    setFilteredCurrencies(filteredCurrencies);
  };

  useEffect(() => {
    async function asyncGetCurrencies() {
      const res = await getCurrencies();

      const mappedCurrencies = Object.entries(res).map((tuple) => ({
        code: tuple[0],
        name: tuple[1],
      }));
      setCurrencies(mappedCurrencies);
      setFilteredCurrencies(mappedCurrencies);
    }

    asyncGetCurrencies();
  }, []);

  const columns = useMemo<ColumnDef<Currency>[]>(
    () => [
      {
        id: "code",
        header: "Code",
        accessorKey: "code",
        cell: (info) => info.getValue(),
      },
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  return (
    <Table
      data={filteredCurrencies}
      columns={columns}
      onSearch={filterCurrencies}
      onRowClick={(row) => onRowClick(row.original.code)}
      pageSize={20}
      tableHeight="calc(100vh - 550px)"
    />
  );
};
