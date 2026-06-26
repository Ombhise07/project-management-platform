"use client";

import { Search, Plus } from "lucide-react";

interface Props {
  search: string;
  status: string;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: string) => void;

  onCreateTask: () => void;
}

export default function TaskFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onCreateTask,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border bg-white p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-xl border py-2.5 pl-10 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border px-4 py-2.5 outline-none focus:border-blue-500"
        >
          <option value="ALL">All Status</option>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="IN_REVIEW">In Review</option>
          <option value="DONE">Done</option>
        </select>
      </div>

      <button
        onClick={onCreateTask}
        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
      >
        <Plus size={18} />
        Create Task
      </button>
    </div>
  );
}
