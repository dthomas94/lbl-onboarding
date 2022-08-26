import {
  Box,
  Button,
  ButtonGroup,
  Input,
  TableContainer,
} from "@chakra-ui/react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  Row,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { StyledTable } from "./Table.css";

interface TableProps {
  data: Array<any>;
  columns: Array<any>;
  onSearch: (val: string) => void;
  onRowClick?: (row: Row<any>) => void;
  pageSize?: number;
  tableHeight?: string | number;
}

export const Table = ({
  data,
  columns,
  onSearch,
  onRowClick,
  pageSize = 10,
  tableHeight,
}: TableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  const search = (val: string) => {
    setSearchVal(val);
    onSearch(val);
  };

  return (
    <Box className="table-container">
      <Input
        type="text"
        value={searchVal}
        onChange={(evt) => search(evt.target.value)}
        placeholder="Try 'jpy'"
      />
      <TableContainer as={StyledTable} lightTheme tableHeight={tableHeight}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableContainer>
      <ButtonGroup
        display="flex"
        justifyContent="center"
        columnGap="5"
        marginTop="15"
      >
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Prev
        </Button>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next
        </Button>
      </ButtonGroup>
    </Box>
  );
};
