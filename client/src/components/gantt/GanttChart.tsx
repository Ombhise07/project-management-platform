"use client";

import { Gantt, Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

export default function GanttChart({ tasks }: { tasks: any[] }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center text-gray-500">
        No timeline data available for this project.
      </div>
    );
  }

  const ganttTasks: Task[] = tasks
    .filter((task) => task.startDate && task.dueDate)
    .map((task) => ({
      start: new Date(task.startDate),

      end: new Date(task.dueDate),

      name: task.title || "Untitled Task",

      id: task.id,

      progress: task.progress ?? 0,

      type: "task",

      dependencies: task.dependencies?.map((dependency: any) => dependency.dependsOnTaskId) || [],

      styles: {
        backgroundColor: "#3b82f6",
        backgroundSelectedColor: "#2563eb",
        progressColor: "#1d4ed8",
        progressSelectedColor: "#1e40af",
      },
    }));

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <Gantt tasks={ganttTasks} columnWidth={60} listCellWidth="180px" />
    </div>
  );
}
