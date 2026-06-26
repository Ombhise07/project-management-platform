"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { logout } from "@/services/auth.service";
import { getDashboard } from "@/services/dashboard.service";

import { useAuthStore } from "@/store/auth.store";
import { getCurrentUser } from "@/services/auth.service";
import { useProjectStore } from "@/store/project.store";

interface DashboardData {
  summary: {
    totalProjects: number;
    totalTasks: number;
    completedTasks: number;
    overdueTasks: number;
    recentProjects: Project[];
  };
}

export default function DashboardPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.logout);

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const { workspaceId } = useProjectStore((state) => state.workspaceId);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    const loadDashboard = async () => {
      try {
        const response = await getDashboard(workspaceId);

        setDashboard(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboard();
  }, [user, router]);

  const handleLogout = async () => {
    await logout();

    clearAuth();

    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="mb-4 text-3xl font-bold">Welcome, {user?.name}</h1>

        <button onClick={handleLogout} className="rounded bg-red-600 px-4 py-2 text-white">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded border p-4 shadow">
          <h2 className="text-sm text-gray-500">Total Projects</h2>

          <p className="text-3xl font-bold">{dashboard?.summary.totalProjects ?? 0}</p>
        </div>

        <div className="rounded border p-4 shadow">
          <h2 className="text-sm text-gray-500">Total Tasks</h2>

          <p className="text-3xl font-bold">{dashboard?.summary.totalTasks ?? 0}</p>
        </div>

        <div className="rounded border p-4 shadow">
          <h2 className="text-sm text-gray-500">Completed Tasks</h2>

          <p className="text-3xl font-bold">{dashboard?.summary.completedTasks ?? 0}</p>
        </div>

        <div className="rounded border p-4 shadow">
          <h2 className="text-sm text-gray-500">Overdue Tasks</h2>

          <p className="text-3xl font-bold">{dashboard?.summary.overdueTasks ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
