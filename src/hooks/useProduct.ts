import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";
import { ProductData } from "../lib/types/product";

export const useProduct = (product_id: string) => {
  return useQuery({
    queryKey: ["get_product", product_id],
    queryFn: async () => {
      const data = await invoke<ProductData>("get_product", {
        productId: product_id,
      });
      return data;
    },

    enabled: !!product_id,
    retryOnMount: false,
    retry: false,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
