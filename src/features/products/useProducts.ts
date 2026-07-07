import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type ProductQuery,
} from "./productApi";

export const PRODUCTS_QUERY_KEY = "products" as const;

/** Fetch product list */
export const useProducts = (query: ProductQuery) =>
  useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, query],
    queryFn: () => fetchProducts(query),
    placeholderData: (prev) => prev, 
  });

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] }),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateProduct(id, formData),
    onSuccess: () => qc.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] }),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] }),
  });
};