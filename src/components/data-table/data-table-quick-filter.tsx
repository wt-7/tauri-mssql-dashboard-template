import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import * as React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Toggle } from "../ui/toggle";

export type BooleanFilter = {
  name: string;
  filterColumn: string;
  filterValue: any;
  isActive: boolean;
};

interface DataTableQuickFilterProps<TData> {
  table: Table<TData>;
  filters: BooleanFilter[];
}

export function DataTableQuickFilter<TData>({
  table,
  filters,
}: DataTableQuickFilterProps<TData>) {
  const [filterState, setFilterState] = React.useState(filters);

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="inline-flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden lg:flex border-dashed"
          >
            <HamburgerMenuIcon className="mr-2 h-4" />
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Quick filters</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col space-y-1">
            {filterState?.map((filter) => {
              return (
                <Toggle
                  key={filter.name}
                  variant="outline"
                  pressed={filter.isActive}
                  onPressedChange={(bool) => {
                    // If the column is filtered, but by another filter, remove the other filter

                    const collidingFilter = filterState.find(
                      (f) =>
                        f.isActive &&
                        f.filterColumn === filter.filterColumn &&
                        f !== filter
                    );

                    if (collidingFilter) {
                      setFilterState((prevState) =>
                        prevState.map((f) =>
                          f === collidingFilter ? { ...f, isActive: false } : f
                        )
                      );
                    }

                    table
                      .getColumn(filter.filterColumn)
                      ?.setFilterValue(bool ? filter.filterValue : null);

                    setFilterState((prevState) =>
                      prevState.map((f) =>
                        f.name === filter.name ? { ...f, isActive: bool } : f
                      )
                    );
                  }}
                >
                  {filter.name}
                </Toggle>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => {
            table.resetColumnFilters();
            table.resetGlobalFilter();
            setFilterState((prevState) =>
              prevState.map((f) => ({ ...f, isActive: false }))
            );
          }}
          className="px-2 lg:px-3"
        >
          Clear
          <Cross2Icon className="ml-2 h-4" />
        </Button>
      )}
    </div>
  );
}
