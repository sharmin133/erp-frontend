import { useQuery } from "@tanstack/react-query";
import { Package, ShoppingCart, AlertTriangle, LayoutDashboard } from "lucide-react";
import { StatCard } from "../../components/common/StatCard";
import { MonthlyRevenueCard } from "./MonthlyRevenueCard";
import { TopSellingProducts } from "./TopSellingProducts";
import { CategoryDistributionChart } from "./CategoryDistributionChart";
import { fetchDashboardStats } from "./dashboardApi";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchDashboardStats,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
    <div className="flex items-center gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-md">
    <LayoutDashboard size={22} />
  </div>

  <div>
    <h1 className="text-2xl font-semibold text-gray-900">
      Dashboard
    </h1>
    <p className="mt-1 text-sm text-gray-500">
      Overview of your inventory and sales.
    </p>
  </div>
</div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          label="Total Products"
          value={data?.totalProducts ?? (isLoading ? "..." : 0)}
          icon={Package}
          accent="text-emerald-600"
        />
        <StatCard
          label="Total Sales"
          value={data?.totalSales ?? (isLoading ? "..." : 0)}
          icon={ShoppingCart}
          accent="text-emerald-600"
        />
        <StatCard
          label="Low Stock"
          value={data?.lowStockProducts?.length ?? (isLoading ? "..." : 0)}
          icon={AlertTriangle}
          accent="text-red-500"
        />
      </div>

      {/* Monthly Revenue + Top Selling + Category Distribution */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {data?.monthlyRevenue && (
          <MonthlyRevenueCard
            amount={data.monthlyRevenue.amount}
            changePercent={data.monthlyRevenue.changePercent}
          />
        )}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-1">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Top Selling Products</h2>
          {isLoading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : (
            <TopSellingProducts products={data?.topSellingProducts || []} />
          )}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-1">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Category Distribution</h2>
          {isLoading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : (
            <CategoryDistributionChart data={data?.categoryDistribution || []} />
          )}
        </div>
      </div>

      {/* Low Stock Products */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Low Stock Products</h2>
          <p className="mt-1 text-sm text-gray-500">Products with fewer than 5 items remaining.</p>
        </div>

        {data?.lowStockProducts?.length ? (
          <ul className="divide-y divide-gray-100">
            {data.lowStockProducts.map((product) => (
              <li
                key={product._id}
                className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">SKU: {product.sku}</p>
                </div>
                <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
                  {product.stockQuantity} left
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-14">
            <AlertTriangle size={42} className="mb-3 text-emerald-500" />
            <p className="font-medium text-gray-700">No low stock products</p>
            <p className="mt-1 text-sm text-gray-500">Everything is sufficiently stocked.</p>
          </div>
        )}
      </div>
    </div>
  );
}