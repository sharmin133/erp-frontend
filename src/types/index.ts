export type UserRole = "admin" | "manager" | "employee";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}


export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface Product {
  _id: string;
  name: string;
  sku: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stockQuantity: number;
  image: string;
}



export interface SaleItem {
  product: string;
  quantity: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: { total: number; page: number; limit: number; totalPages: number };
}