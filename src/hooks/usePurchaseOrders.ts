import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";
import { PurchaseOrderData } from "../lib/types/purchase-order";

export const usePurchaseOrders = () => {
  return useQuery({
    queryKey: ["get_purchase_orders"],
    queryFn: async () => {
      const data = await invoke<PurchaseOrderData>("get_purchase_orders");
      return data;
    },

    retry: false,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
