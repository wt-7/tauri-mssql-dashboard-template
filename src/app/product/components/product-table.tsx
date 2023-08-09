import { DataTable } from "@/src/components/data-table/data-table";
import { DataTableColumnHeader } from "@/src/components/data-table/data-table-header";
import { Badge } from "@/src/components/ui/badge";
import { filterFns } from "@/src/lib/table-filter-functions";
import { ProductComponent } from "@/src/lib/types/product";
import {
  cn,
  currencyFormatter,
  tailwindColourFromString,
} from "@/src/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

interface ProductTableProps {
  data: ProductComponent[];
}

export function ProductTable({ data }: ProductTableProps) {
  const suppliers = new Set(data.map((x) => x.supplier));
  const facetedFilters = [
    {
      title: "Supplier",
      filterColumn: "supplier",
      options: Array.from(suppliers)
        .sort()
        .map((supplier) => ({
          value: supplier,
          label: supplier,
        })),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={productColumns}
      defaultVisbilility={productDefaultVisbilility}
      enableSearch={true}
      quickFilters={productQuickFilters}
      facetedFilters={facetedFilters}
    />
  );
}

const productColumns: ColumnDef<ProductComponent>[] = [
  {
    accessorKey: "component_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock code" />
    ),
    filterFn: filterFns.startsWith,
    enableGlobalFilter: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),

    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("description")}</span>
    ),
    enableGlobalFilter: true,
  },

  {
    accessorKey: "quantity_per",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "material_cost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Material cost" />
    ),
    cell: ({ row }) => (
      <span>{currencyFormatter.format(row.getValue("material_cost"))}</span>
    ),

    enableGlobalFilter: false,
  },

  {
    accessorKey: "labour_cost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Labour cost" />
    ),
    cell: ({ row }) => (
      <span>{currencyFormatter.format(row.getValue("material_cost"))}</span>
    ),

    enableGlobalFilter: false,
  },

  {
    accessorKey: "supplier",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supplier" />
    ),
    enableGlobalFilter: true,
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
    accessorKey: "date_created",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date created" />
    ),
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <Badge variant="outline"> {row.getValue("date_created")}</Badge>
    ),
  },
  {
    accessorKey: "unallocated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unallocated" />
    ),
    enableGlobalFilter: false,
    filterFn: filterFns.greaterThan,
  },
];

const productDefaultVisbilility = {
  component_id: true,
  description: true,
  quantity_per: true,
  material_cost: true,
  labour_cost: true,
  supplier: true,
  date_created: true,
  unallocated: false,
};

const productQuickFilters = [
  {
    name: "Is unallocated",
    isActive: false,
    filterValue: 0,
    filterColumn: "unallocated",
  },
];
