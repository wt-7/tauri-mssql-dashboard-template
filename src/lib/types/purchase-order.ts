export type OrderStatus = "Open" | "Delayed" | "Arrived" | "Unknown";

export interface PurchaseOrderLine {
  stock_code: string;
  description: string;
  order_quantity: number;
  material_cost: number;
  product_class: string;
  due_date: string;
  arrived: boolean;
}

export interface PurchaseOrder {
  purchase_order_id: string;
  order_status: OrderStatus;
  supplier: string;
  lines: PurchaseOrderLine[];
  order_date: string;
}

export interface PurchaseOrderData {
  purchase_orders: PurchaseOrder[];
  monthly_orders: {
    month: string;
    orders: number;
  }[];
}
