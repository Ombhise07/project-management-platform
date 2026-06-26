"use client";

import { X } from "lucide-react";

import { Task } from "@/types/task";

import { TaskPriorityBadge, TaskStatusBadge } from "@/components/task";

interface Props {
  task: Task;

  onClose: () => void;
}

export default function TaskDrawerHeader({ task, onClose }: Props) {
  return (
    <div className="border-b p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{task.title}</h2>

          <p className="mt-2 text-sm text-slate-500">{task.description || "No description"}</p>
        </div>

        <button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100">
          <X size={20} />
        </button>
      </div>

      <div className="flex gap-3">
        <TaskStatusBadge status={task.status} />

        <TaskPriorityBadge priority={task.priority} />
      </div>
    </div>
  );
}
