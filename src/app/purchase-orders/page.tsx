"use client";

import { dataViewAtom } from "@/src/atoms/purchase-orders";
import { BarChart } from "@/src/components/charts/bar-chart";
import ErrorAlert from "@/src/components/error-alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { usePurchaseOrders } from "@/src/hooks/usePurchaseOrders";
import { useAtom } from "jotai";
import { PurchaseOrderTable } from "./components/purchase-order-table";
import SalesOrderSkeleton from "./loading";

export default function PurchaseOrderPage() {
  const { data, isLoading, isError, error } = usePurchaseOrders();

  const [dataView, setDataView] = useAtom(dataViewAtom);

  if (isError) return <ErrorAlert title="Error" text={String(error)} />;

  if (isLoading) return <SalesOrderSkeleton />;

  return (
    <div className="mx-12 my-6">
      <Tabs
        defaultValue={dataView}
        onValueChange={(view) => setDataView(view as "table" | "graph")}
      >
        <div className="flex justify-between">
          <div>
            <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
              Purchase Orders
            </h3>
            <p className="text-sm text-muted-foreground">
              View purchase orders and track the progress of each item.
            </p>
          </div>
          <TabsList>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="graph">Graph</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="table" className="mt-6">
          <PurchaseOrderTable data={data.purchase_orders} />
        </TabsContent>
        <TabsContent value="graph" className="mt-6">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Monthly purchase order volume</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart
                data={data.monthly_orders}
                xAxis="month"
                yAxis="orders"
                yAxisWidth={50}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
