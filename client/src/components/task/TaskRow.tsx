"use client";

import { CalendarDays, CheckSquare, MoreHorizontal } from "lucide-react";

import { Task } from "@/types/task";

import TaskAssignee from "./TaskAssignee";
import TaskPriorityBadge from "./TaskPriorityBadge";
import TaskStatusBadge from "./TaskStatusBadge";

interface Props {
  task: Task;
  onClick?: (task: Task) => void;
}

export default function TaskRow({ task, onClick }: Props) {
  return (
    <tr
      onClick={() => onClick?.(task)}
      className="cursor-pointer border-b transition hover:bg-slate-50"
    >
      {/* Task */}
      <td className="px-6 py-5">
        <div>
          <h3 className="font-semibold text-slate-900">{task.title}</h3>

          <p className="mt-1 line-clamp-1 text-sm text-slate-500">
            {task.description || "No description"}
          </p>

          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <CheckSquare size={14} />
            {task.subtasks.length} Subtasks
          </div>
        </div>
      </td>

      {/* Priority */}
      <td className="px-6 py-5">
        <TaskPriorityBadge priority={task.priority} />
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <TaskStatusBadge status={task.status} />
      </td>

      {/* Progress */}
      <td className="px-6 py-5">
        <div className="w-40">
          <div className="mb-1 flex justify-between text-xs">
            <span>{task.progress}%</span>
          </div>

          <div className="h-2 rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all"
              style={{
                width: `${task.progress}%`,
              }}
            />
          </div>
        </div>
      </td>

      {/* Assignee */}
      <td className="px-6 py-5">
        <TaskAssignee assignee={task.assignee} />
      </td>

      {/* Due Date */}
      <td className="px-6 py-5">
        {task.dueDate ? (
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays size={16} />

            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        ) : (
          <span className="text-sm text-slate-400">—</span>
        )}
      </td>

      {/* Actions */}
      <td className="px-6 py-5 text-right">
        <button
          onClick={(e) => e.stopPropagation()}
          className="rounded-lg p-2 transition hover:bg-slate-100"
        >
          <MoreHorizontal size={18} />
        </button>
      </td>
    </tr>
  );
}
