import { api } from "../../api/axiosInstance";
import type { ApiResponse, Product } from "../../types";

export interface ProductQuery {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const fetchProducts = async (query: ProductQuery) => {
  const res = await api.get<ApiResponse<Product[]>>("/products", { params: query });
  return res.data; // includes data (items) + meta (pagination)
};

export const createProduct = async (formData: FormData) => {
  const res = await api.post<ApiResponse<Product>>("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const updateProduct = async (id: string, formData: FormData) => {
  const res = await api.put<ApiResponse<Product>>(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const deleteProduct = async (id: string) => {
  await api.delete(`/products/${id}`);
};