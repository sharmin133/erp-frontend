


// TODO: replace with real API call (GET /api/dashboard/stats) once JWT auth is wired up
const dummyStats = {
  totalProducts: 42,
  totalCustomers: 15,
  totalSales: 87,
  lowStockProducts: [
    { _id: "1", name: "Wireless Mouse", sku: "WM-001", stockQuantity: 3 },
    { _id: "2", name: "USB-C Cable", sku: "UC-002", stockQuantity: 1 },
  ],
};

export default function DashboardPage() {
  const data = dummyStats;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-white">Dashboard</h1>

    

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
        <h2 className="mb-3 font-medium text-white">Low Stock Products (below 5 units)</h2>
        {data.lowStockProducts.length ? (
          <ul className="divide-y divide-gray-800">
            {data.lowStockProducts.map((p) => (
              <li key={p._id} className="flex justify-between py-2 text-sm text-gray-300">
                <span>
                  {p.name} <span className="text-gray-500">({p.sku})</span>
                </span>
                <span className="font-semibold text-red-400">{p.stockQuantity} left</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No low stock products 🎉</p>
        )}
      </div>
    </div>
  );
}