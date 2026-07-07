interface Props {
  products: { productId: string; name: string; totalSold: number }[];
}

export function TopSellingProducts({ products }: Props) {
  const maxSold = Math.max(...products.map((p) => p.totalSold), 1);

  if (products.length === 0) {
    return <p className="text-sm text-gray-400">No sales data yet.</p>;
  }

  return (
    <div className="space-y-4">
      {products.map((p) => (
        <div key={p.productId}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">{p.name}</span>
            <span className="text-gray-500">{p.totalSold} Sold</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-emerald-500 transition-all"
              style={{ width: `${(p.totalSold / maxSold) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}