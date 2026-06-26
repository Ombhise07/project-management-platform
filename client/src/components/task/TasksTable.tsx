"use client";

import { Task } from "@/types/task";

import TaskRow from "./TaskRow";

interface Props {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

export default function TasksTable({ tasks, onTaskClick }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b bg-slate-50">
            <tr className="text-left text-sm font-semibold text-slate-600">
              <th className="px-6 py-4">Task</th>

              <th className="px-6 py-4">Priority</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4">Progress</th>

              <th className="px-6 py-4">Assignee</th>

              <th className="px-6 py-4">Due Date</th>

              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} onClick={onTaskClick} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
