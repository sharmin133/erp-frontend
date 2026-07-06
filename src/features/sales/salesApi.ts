import { api } from "../../api/axiosInstance";
import type { ApiResponse, Product, SaleItem } from "../../types";

export const fetchAllProducts = async () => {
  const res = await api.get<ApiResponse<Product[]>>("/products", { params: { limit: 100 } });
  return res.data.data;
};

export const createSale = async (payload: { items: SaleItem[] }) => {
  const res = await api.post("/sales", payload);
  return res.data.data;
};