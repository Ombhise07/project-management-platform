"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import GanttChart from "@/components/gantt/GanttChart";

import { getProjectTimeline } from "@/services/gantt.service";

export default function GanttPage() {
  const params = useParams();

  const projectId = params.projectId as string;

  const [tasks, setTasks] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getProjectTimeline(projectId);

        setTasks(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      load();
    }
  }, [projectId]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (loading) {
    return <div className="p-8 text-lg">Loading project timeline...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Project Timeline</h1>

      {tasks.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center text-gray-500">
          No tasks with timeline dates found.
        </div>
      ) : (
        <GanttChart tasks={tasks} />
      )}
    </div>
  );
}
