import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface Props {
  amount: number;
  changePercent: number;
}

export function MonthlyRevenueCard({
  amount,
  changePercent,
}: Props) {
  const isPositive = changePercent >= 0;

  
  const progress = Math.min(Math.abs(changePercent) * 4, 100);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Background Glow */}
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-100 blur-3xl opacity-70 transition-all duration-500 group-hover:scale-125" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Monthly Revenue
            </p>

            <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
              ৳{amount.toLocaleString()}
            </h2>

            <div className="mt-4 flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                  isPositive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {isPositive ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}

                {isPositive ? "+" : ""}
                {changePercent}%
              </span>

              <span className="text-xs text-gray-400">
                vs Last Month
              </span>
            </div>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-300/40">
            <Wallet size={28} />
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-gray-200" />

        {/* Progress */}
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-500">Monthly Target</span>
            <span className="font-semibold text-gray-800">
              {progress.toFixed(0)}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-linear-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Status
            </p>
            <p
              className={`mt-1 font-semibold ${
                isPositive ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {isPositive ? "Growing 📈" : "Declining 📉"}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Updated
            </p>
            <p className="mt-1 font-semibold text-gray-800">
              Today
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}