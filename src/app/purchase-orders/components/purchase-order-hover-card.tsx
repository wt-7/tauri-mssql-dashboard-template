import { Button } from "@/src/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/src/components/ui/hover-card";
import { Separator } from "@/src/components/ui/separator";
import { PurchaseOrderLine } from "@/src/lib/types/purchase-order";
import { cn, tailwindColourFromString } from "@/src/lib/utils";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

export function PurchaseOrderLineHoverCard({
  stock_code,
  description,
  material_cost,
  order_quantity,
  product_class,
  due_date,
  arrived,
}: PurchaseOrderLine) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          className={cn(
            "h-6 rounded-md px-2.5 py-0.5 text-xs font-semibold truncate",
            tailwindColourFromString(product_class)
          )}
        >
          {stock_code}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-30">
        <div>
          <div className="flex-col space-y-1">
            <h4 className="text-sm font-semibold">{stock_code}</h4>
            <p className="text-xs font-semibold text-muted-foreground">
              {product_class}
            </p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>

          <Separator className="my-2" />
          <div className="flex-col mt-2 space-y-2">
            <p className="font-semibold text-xs"> General </p>

            <div className="flex space-x-1 text-xs text-muted-foreground items-center">
              <p className="font-semibold"> Material cost:</p>
              <p>
                {Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(material_cost)}
              </p>
            </div>
            <div className="flex space-x-1 text-xs text-muted-foreground items-center">
              <p className="font-semibold"> Order quantity:</p>
              <p>{order_quantity}</p>
            </div>
          </div>

          <Separator className="my-2" />
          <div className="flex-col mt-2 space-y-2">
            <p className="font-semibold text-xs"> Progress </p>
            <div className="flex space-x-1 text-xs text-muted-foreground ">
              <p className="font-semibold"> Arrived:</p>
              <p>
                {arrived ? (
                  <CheckCircledIcon className="text-green-500" />
                ) : (
                  <CrossCircledIcon className="text-destructive" />
                )}
              </p>
            </div>
            <div className="flex space-x-1 text-xs text-muted-foreground items-center">
              <p className="font-semibold"> Due date:</p>
              <p>{due_date}</p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
