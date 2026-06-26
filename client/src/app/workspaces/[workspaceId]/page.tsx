"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { WorkspaceLayout } from "@/components/layout";

import { StatsGrid, RecentProjects } from "@/components/dashboard";

import { getDashboard } from "@/services/dashboard.service";
import { getWorkspaceById } from "@/services/workspace.service";

import { useAuthStore } from "@/store/auth.store";

import { DashboardData } from "@/types/dashboard";

export default function WorkspaceDashboardPage() {
  const router = useRouter();

  const params = useParams();

  const workspaceId = params.workspaceId as string;

  const user = useAuthStore((state) => state.user);

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [workspaceName, setWorkspaceName] = useState("Workspace");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.replace("/login");

      return;
    }

    const loadDashboard = async () => {
      setLoading(true);
      setError(null);

      try {
        const [workspaceResponse, dashboardResponse] = await Promise.all([
          getWorkspaceById(workspaceId),
          getDashboard(workspaceId),
        ]);

        setWorkspaceName(workspaceResponse.data.name ?? "Workspace");
        setDashboard(dashboardResponse.data);
      } catch (fetchError) {
        console.error(fetchError);
        setError("Failed to load workspace data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [workspaceId, user, router]);

  if (!user) return null;

  if (loading) {
    return (
      <WorkspaceLayout workspaceId={workspaceId} workspaceName="Loading...">
        <p>Loading dashboard...</p>
      </WorkspaceLayout>
    );
  }

  return (
    <WorkspaceLayout workspaceId={workspaceId} workspaceName={workspaceName}>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : dashboard ? (
        <>
          <StatsGrid summary={dashboard.summary} />

          <RecentProjects projects={dashboard.recentProjects} />
        </>
      ) : (
        <p>No dashboard data available.</p>
      )}
    </WorkspaceLayout>
  );
}
