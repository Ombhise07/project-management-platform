import { FolderKanban, CheckSquare, CircleCheckBig, TriangleAlert } from "lucide-react";

import StatCard from "./StatCard";

interface Props {
  summary: {
    totalProjects: number;
    totalTasks: number;
    completedTasks: number;
    overdueTasks: number;
  };
}

export default function StatsGrid({ summary }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Total Projects" value={summary.totalProjects} icon={FolderKanban} />

      <StatCard
        title="Total Tasks"
        value={summary.totalTasks}
        icon={CheckSquare}
        iconBg="bg-indigo-100"
        iconColor="text-indigo-600"
      />

      <StatCard
        title="Completed Tasks"
        value={summary.completedTasks}
        icon={CircleCheckBig}
        iconBg="bg-emerald-100"
        iconColor="text-emerald-600"
      />

      <StatCard
        title="Overdue Tasks"
        value={summary.overdueTasks}
        icon={TriangleAlert}
        iconBg="bg-red-100"
        iconColor="text-red-600"
      />
    </div>
  );
}
