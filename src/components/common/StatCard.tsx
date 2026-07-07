import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  accent?: string;
  iconBg?: string;
}

export const StatCard = ({
  label,
  value,
  icon: Icon,

  iconBg = "from-emerald-500 to-teal-500",
}: StatCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-linear-to-br from-white via-white to-gray-50 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-100/40 blur-3xl transition-transform duration-300 group-hover:scale-125" />

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {label}
          </p>

          <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${iconBg} text-white shadow-lg transition-all duration-300 group-hover:rotate-6 group-hover:scale-110`}
        >
          <Icon size={26} />
        </div>
      </div>
    </div>
  );
}