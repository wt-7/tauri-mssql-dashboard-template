"use client";

import {
  currentProductAtom,
  isPulsingAtom,
  tableViewAtom,
} from "@/src/atoms/products";
import ErrorAlert from "@/src/components/error-alert";
import { KPICard } from "@/src/components/kpi-card";
import { Switch } from "@/src/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { useProduct } from "@/src/hooks/useProduct";
import { cn, currencyFormatter } from "@/src/lib/utils";
import { CubeIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { ProductLandingInfo } from "./components/product-landing-info";
import { ProductTable } from "./components/product-table";
import { SalesOrderTable } from "./components/sales-order-table";
import ProductSkeleton from "./loading";

export default function ProductResult() {
  const [isPulsing, setIsPulsing] = useAtom(isPulsingAtom);
  const [tableView, setTableView] = useAtom(tableViewAtom);
  const [product_id] = useAtom(currentProductAtom);
  const { data, isLoading, isError, error } = useProduct(product_id);

  if (!product_id) return <ProductLandingInfo />;

  if (isError) return <ErrorAlert title="Error" text={String(error)} />;

  if (isLoading) return <ProductSkeleton />;

  const totalMaterialCost = data.components.reduce(
    (acc, curr) => acc + curr.material_cost * curr.quantity_per,
    0
  );

  const totalLabourCost = data.components.reduce(
    (acc, curr) => acc + curr.labour_cost * curr.quantity_per,
    0
  );

  return (
    <div className={cn("mx-12 my-6", isPulsing && "animate-pulse")}>
      <div className="flex justify-between">
        <div>
          <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
            {data.product_id}
          </h3>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </div>
        <div className="flex text-sm font-medium items-center space-x-2">
          <p>Pulse</p>

          <Switch
            className="data-[state=checked]:bg-primary"
            checked={isPulsing}
            onCheckedChange={(bool) => {
              setIsPulsing(bool);
            }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Material cost"
          metric={currencyFormatter.format(totalMaterialCost)}
          Icon={CubeIcon}
          text={"Estimated material cost"}
        />
        <KPICard
          title="Labour cost"
          metric={currencyFormatter.format(totalLabourCost)}
          Icon={CubeIcon}
          text={"Estimated labour cost"}
        />
        <KPICard
          title="Total cost"
          metric={currencyFormatter.format(totalMaterialCost + totalLabourCost)}
          Icon={CubeIcon}
          text={`${(
            (totalLabourCost / (totalMaterialCost + totalLabourCost)) *
            100
          ).toFixed()}% labour, ${(
            (totalMaterialCost / (totalMaterialCost + totalLabourCost)) *
            100
          ).toFixed()}% material`}
        />
        <KPICard
          title="Sales orders"
          metric={data.sales_orders.length}
          Icon={CubeIcon}
          text="Total sales orders"
        />
      </div>

      <Tabs
        defaultValue={tableView}
        className="mt-12"
        onValueChange={(view) =>
          setTableView(view as "components" | "salesOrders")
        }
      >
        <TabsList>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="salesOrders">Sales Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="components" className="grid-grid-cols-3-gap-4">
          <ProductTable data={data.components} />
        </TabsContent>
        <TabsContent value="salesOrders">
          <SalesOrderTable data={data.sales_orders} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
