import { api } from "../../api/axiosInstance";
import type { ApiResponse } from "../../types";

export interface DashboardStats {
  totalProducts: number;
  totalSales: number;
  lowStockProducts: { _id: string; name: string; sku: string; stockQuantity: number }[];
  monthlyRevenue: { amount: number; changePercent: number };
  topSellingProducts: { productId: string; name: string; totalSold: number }[];
  categoryDistribution: { category: string; count: number; percentage: number }[];
}

export const fetchDashboardStats = async () => {
  const res = await api.get<ApiResponse<DashboardStats>>("/dashboard/stats");
  return res.data.data;
};