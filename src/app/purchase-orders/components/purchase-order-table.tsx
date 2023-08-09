import { DataTable } from "@/src/components/data-table/data-table";
import { DataTableColumnHeader } from "@/src/components/data-table/data-table-header";
import { Badge } from "@/src/components/ui/badge";
import {
  OrderStatus,
  PurchaseOrder,
  PurchaseOrderLine,
} from "@/src/lib/types/purchase-order";
import { cn, tailwindColourFromString } from "@/src/lib/utils";
import {
  CheckCircledIcon,
  LapTimerIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { PurchaseOrderLineHoverCard } from "./purchase-order-hover-card";

interface PurchaseOrderTableProps {
  data: PurchaseOrder[];
}

export function PurchaseOrderTable({ data }: PurchaseOrderTableProps) {
  const orderStatuses = new Set(data.map((order) => order.order_status));

  const stockCodes = new Set(
    data.flatMap((order) => order.lines.map((line) => line.stock_code))
  );

  const suppliers = new Set(data.map((order) => order.supplier));

  const facetedFilters = [
    {
      filterColumn: "order_status",
      title: "Order status",
      options: Array.from(orderStatuses)
        .sort()
        .map((status) => ({
          value: status,
          label: status,
        })),
    },
    {
      filterColumn: "lines",
      title: "Stock codes",
      options: Array.from(stockCodes)
        .sort()
        .map((status) => ({
          value: status,
          label: status,
        })),
    },
    {
      filterColumn: "supplier",
      title: "Supplier",
      options: Array.from(suppliers)
        .sort()
        .map((status) => ({
          value: status,
          label: status,
        })),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={purchaseOrderColumns}
      defaultVisbilility={purchaseOrderDefaultVis}
      enableSearch
      facetedFilters={facetedFilters}
    />
  );
}

const purchaseOrderColumns: ColumnDef<PurchaseOrder>[] = [
  {
    accessorKey: "purchase_order_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchase order" />
    ),
  },

  {
    accessorKey: "lines",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lines" />
    ),
    cell: ({ row }) => {
      const lines = row.getValue<PurchaseOrderLine[]>("lines");
      return (
        <div className="flex flex-row space-x-2">
          {lines.length === 0 ? (
            <Badge variant={"destructive"}> None</Badge>
          ) : (
            lines.map((line, idx) => (
              <PurchaseOrderLineHoverCard {...line} key={idx} />
            ))
          )}
        </div>
      );
    },
    filterFn: (row, columnId, filterValue: string[]) => {
      const values = row
        .getValue<PurchaseOrderLine[]>(columnId)
        .map((t) => t.stock_code);
      return filterValue.some((val) => values.includes(val));
    },
  },

  {
    accessorKey: "order_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    filterFn: "arrIncludesSome",
    cell: ({ row }) => {
      const status = row.getValue<OrderStatus>("order_status");
      const Icon = () => {
        switch (status) {
          case "Open":
            return <StopwatchIcon className="w-4 h-4 text-muted-foreground" />;
          case "Delayed":
            return <LapTimerIcon className="w-4 h-4 text-muted-foreground" />;
          case "Arrived":
            return (
              <CheckCircledIcon className="w-4 h-4 text-muted-foreground" />
            );
        }
      };

      return (
        <div className="flex items-center space-x-2">
          <Icon />
          <span className="truncate">{status}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "supplier",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supplier" />
    ),
    filterFn: "arrIncludesSome",
    cell: ({ row }) => {
      const supplier = row.getValue<string>("supplier");
      return (
        <Badge className={cn(tailwindColourFromString(supplier))}>
          {supplier}
        </Badge>
      );
    },
  },

  {
    accessorKey: "order_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order date" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline"> {row.getValue("order_date")}</Badge>
    ),
  },
];

const purchaseOrderDefaultVis = {
  purchase_order_id: true,
  order_status: true,
  lines: true,
  supplier: true,
  order_date: true,
};
