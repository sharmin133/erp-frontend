import type { LucideIcon } from "lucide-react";


interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  accent?: string; // tailwind color class e.g. "text-indigo-600"
}

/** Reusable dashboard statistic card */
export const StatCard = ({ label, value, icon: Icon, accent = "text-primary" }: StatCardProps) => (
  <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className={`rounded-lg bg-gray-100 p-3 ${accent}`}>
      <Icon size={22} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);
