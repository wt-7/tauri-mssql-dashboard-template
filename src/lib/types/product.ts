export interface ProductComponent {
  component_id: string;
  description: string;
  quantity_per: number;
  material_cost: number;
  labour_cost: number;
  supplier: string;
  date_created: string;
  unallocated: number;
}

export interface SalesOrder {
  sales_order_id: string;
  location: string;
  customer: string;
  order_date: string | null;
  completion_date: string | null;
  order_quantity: number;
  build_cost: number;
  sale_price: number;
  percent_complete: number;
}

export interface ProductData {
  product_id: string;
  description: string;
  components: ProductComponent[];
  sales_orders: SalesOrder[];
}
