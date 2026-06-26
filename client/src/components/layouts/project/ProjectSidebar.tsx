"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  CheckSquare,
  KanbanSquare,
  CalendarDays,
  ChartGantt,
  Clock3,
  BarChart3,
} from "lucide-react";

interface Props {
  workspaceId: string;
  projectId: string;
}

export default function ProjectSidebar({ workspaceId, projectId }: Props) {
  const pathname = usePathname();

  const links = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      href: `/workspaces/${workspaceId}/projects/${projectId}`,
    },
    {
      label: "Tasks",
      icon: CheckSquare,
      href: `/workspaces/${workspaceId}/projects/${projectId}/tasks`,
    },
    {
      label: "Kanban",
      icon: KanbanSquare,
      href: `/workspaces/${workspaceId}/projects/${projectId}/kanban`,
    },
    {
      label: "Calendar",
      icon: CalendarDays,
      href: `/workspaces/${workspaceId}/projects/${projectId}/calendar`,
    },
    {
      label: "Gantt",
      icon: ChartGantt,
      href: `/workspaces/${workspaceId}/projects/${projectId}/gantt`,
    },
    {
      label: "Time Tracking",
      icon: Clock3,
      href: `/workspaces/${workspaceId}/projects/${projectId}/time`,
    },
    {
      label: "Reports",
      icon: BarChart3,
      href: `/workspaces/${workspaceId}/projects/${projectId}/reports`,
    },
  ];

  return (
    <aside className="w-72 border-r border-slate-200 bg-white">
      <nav className="flex flex-col gap-2 p-5">
        {links.map((link) => {
          const Icon = link.icon;

          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />

              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
