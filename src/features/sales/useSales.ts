import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllProducts, createSale } from "./salesApi";
import { PRODUCTS_QUERY_KEY } from "../products/useProducts";

export const useAllProducts = () =>
  useQuery({ queryKey: ["all-products"], queryFn: fetchAllProducts });

export const useCreateSale = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      // stock quantities changed after a sale — invalidate product list & dashboard
      qc.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
};