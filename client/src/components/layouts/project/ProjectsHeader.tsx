"use client";

import { Search, Plus, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui";

interface ProjectsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  onCreateProject: () => void;
}

export default function ProjectsHeader({
  search,
  onSearchChange,
  onCreateProject,
}: ProjectsHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Projects</h1>

        <p className="mt-2 text-slate-500">View and manage all projects in this workspace.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100 sm:w-72"
          />
        </div>

        <Button variant="outline">
          <SlidersHorizontal size={18} />
          Filter
        </Button>

        <Button onClick={onCreateProject}>
          <Plus size={18} />
          New Project
        </Button>
      </div>
    </div>
  );
}
