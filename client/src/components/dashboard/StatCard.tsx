import { LucideIcon, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  iconColor = "text-blue-600",
  iconBg = "bg-blue-100",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-6 flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon size={22} className={iconColor} />
        </div>

        {trend && (
          <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
            <TrendingUp size={16} />

            {trend}
          </div>
        )}
      </div>

      <p className="text-sm font-medium text-slate-500">{title}</p>

      <h2 className="mt-2 text-4xl font-bold text-slate-900">{value}</h2>
    </div>
  );
}
