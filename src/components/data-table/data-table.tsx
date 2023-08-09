"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DebouncedInput } from "../debounced-input";
import { DataTableColumnVis } from "./data-table-column-vis";
import {
  DataTableFacetedFilter,
  FacetedFilter,
} from "./data-table-faceted-filter";
import { DataTablePagination } from "./data-table-pagination";
import { BooleanFilter, DataTableQuickFilter } from "./data-table-quick-filter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  defaultVisbilility: VisibilityState;
  quickFilters?: BooleanFilter[];
  enableSearch?: boolean;
  facetedFilters?: FacetedFilter[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  defaultVisbilility,
  enableSearch,
  quickFilters,
  facetedFilters,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(defaultVisbilility);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
  });

  return (
    <div>
      <div className="flex justify-end pb-4 space-x-2">
        {enableSearch && (
          <DebouncedInput
            placeholder="Search..."
            value={globalFilter || ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className={"w-full h-8"}
          />
        )}

        {facetedFilters &&
          facetedFilters.map((filter) => (
            <DataTableFacetedFilter
              key={filter.filterColumn}
              table={table}
              filter={filter}
            />
          ))}

        {quickFilters && (
          <DataTableQuickFilter table={table} filters={quickFilters} />
        )}
        <DataTableColumnVis table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="my-2">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
