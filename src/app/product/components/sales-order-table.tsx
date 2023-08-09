import { DataTable } from "@/src/components/data-table/data-table";
import { DataTableColumnHeader } from "@/src/components/data-table/data-table-header";
import { Badge } from "@/src/components/ui/badge";
import { filterFns } from "@/src/lib/table-filter-functions";
import { SalesOrder } from "@/src/lib/types/product";
import { currencyFormatter, getDateColour } from "@/src/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

interface SalesOrderTableProps {
  data: SalesOrder[];
}

export function SalesOrderTable({ data }: SalesOrderTableProps) {
  return (
    <DataTable
      data={data}
      columns={salesOrderColumns}
      defaultVisbilility={salesOrderDefaultVisibility}
      enableSearch={true}
      quickFilters={salesOrderQuickFilters}
    />
  );
}

const salesOrderColumns: ColumnDef<SalesOrder>[] = [
  {
    accessorKey: "sales_order_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales order" />
    ),
    enableGlobalFilter: true,
  },

  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("location")}</span>
    ),
    enableGlobalFilter: true,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    enableGlobalFilter: true,
  },

  {
    accessorKey: "order_quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    enableGlobalFilter: false,
  },

  {
    accessorKey: "order_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order date" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("order_date")}</Badge>
    ),
    enableGlobalFilter: false,
  },

  {
    accessorKey: "build_cost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Build cost" />
    ),
    cell: ({ row }) => (
      <span>{currencyFormatter.format(row.getValue("sale_price"))}</span>
    ),
    enableGlobalFilter: false,
  },

  {
    accessorKey: "sale_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sale price" />
    ),
    cell: ({ row }) => (
      <span>{currencyFormatter.format(row.getValue("sale_price"))}</span>
    ),
    enableGlobalFilter: false,
  },

  {
    accessorKey: "completion_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Completion date" />
    ),
    enableGlobalFilter: false,
    filterFn: filterFns.isSome,

    cell: ({ row }) => {
      const completionDate = row.getValue<string | undefined>(
        "completion_date"
      );
      return completionDate ? (
        <Badge className={getDateColour(new Date(completionDate))}>
          {completionDate}
        </Badge>
      ) : (
        <Badge variant={"outline"}>Incomplete</Badge>
      );
    },
  },

  {
    accessorKey: "percent_complete",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Completion %" />
    ),
    cell: ({ row }) => row.getValue("percent_complete"),
    enableGlobalFilter: false,
  },
];

const salesOrderDefaultVisibility = {
  sales_order_id: true,
  location: true,
  customer: true,
  order_quantity: true,
  build_cost: true,
  sale_price: true,
  completion_date: true,
  completion_percentage: true,
  order_date: true,
};

const salesOrderQuickFilters = [
  {
    name: "Is complete",
    isActive: false,
    filterValue: "",
    filterColumn: "completion_date",
  },
];
