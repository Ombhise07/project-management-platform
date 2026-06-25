"use client";

import { useEffect, useState } from "react";

import {
  getProjectReport,
  getTeamProductivity,
  getOverdueTasks,
  getTimeTrackingReport,
} from "@/services/report.service";

import ProjectReportCard from "@/components/reports/ProjectReportCard";
import TeamProductivityCard from "@/components/reports/TeamProductivityCard";
import TimeTrackingCard from "@/components/reports/TimeTrackingCard";
import OverdueTasksCard from "@/components/reports/OverdueTasksCard";
import ReportCard from "@/components/reports/ReportCard";

import { useProjectStore } from "@/store/project.store";

export default function ReportsPage() {
  const [projectReport, setProjectReport] = useState<any>();

  const [team, setTeam] = useState<any[]>([]);

  const [timeReport, setTimeReport] = useState<any>();

  const [overdue, setOverdue] = useState<any[]>([]);

  const { projectId, workspaceId } = useProjectStore();

  useEffect(() => {
    if (!projectId || !workspaceId) {
      return;
    }

    const load = async () => {
      const [project, teamData, time, overdueTasks] = await Promise.all([
        getProjectReport(projectId),
        getTeamProductivity(workspaceId),
        getTimeTrackingReport(),
        getOverdueTasks(),
      ]);

      setProjectReport(project.data);

      setTeam(teamData.data);

      setTimeReport(time.data);

      setOverdue(overdueTasks.data);
    };

    load();
  }, [projectId, workspaceId]);

  if (!projectReport || !timeReport) {
    return <div className="p-8">Loading reports...</div>;
  }

  return (
    <div className="space-y-6 p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ReportCard title="Project Progress" value={`${projectReport.completionRate}%`} />
        <ReportCard title="Completion %" value={`${projectReport.completionRate}%`} />
        <ReportCard title="Overdue Tasks" value={overdue.length} />
        <ReportCard title="Logged Hours" value={timeReport.totalHours} />
        <ReportCard title="Productivity" value="Coming Soon" />
        <ReportCard title="Recent Activity" value="Coming Soon" />
      </div>

      <h1 className="text-3xl font-bold">Reports & Analytics</h1>

      <ProjectReportCard report={projectReport} />

      <TeamProductivityCard team={team} />

      <TimeTrackingCard report={timeReport} />

      <OverdueTasksCard tasks={overdue} />
    </div>
  );
}
