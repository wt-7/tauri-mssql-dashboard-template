import { Row } from "@tanstack/react-table";

const startsWith = (
  row: Row<any>,
  columnId: string,
  filterValue: string
): boolean => {
  const rowValue: string = row.getValue(columnId);
  return rowValue?.startsWith(filterValue);
};

startsWith.autoRemove = (val: any) =>
  val === undefined || val === null || val === "";

const greaterThan = (
  row: Row<any>,
  columnId: string,
  filterValue: number
): boolean => {
  const rowValue = row.getValue<number>(columnId);
  return rowValue > filterValue;
};

greaterThan.autoRemove = (val: any) =>
  val === undefined || val === null || val === "";

const isSome = (
  row: Row<any>,
  columnId: string,
  _filterValue: number
): boolean => {
  const rowValue = row.getValue<number>(columnId);
  return rowValue != undefined && rowValue != null;
};

isSome.autoRemove = (val: any) =>
  val === undefined || val === null || val === "";

export const filterFns = {
  startsWith,
  greaterThan,
  isSome,
};
