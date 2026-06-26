"use client";

import { useRouter } from "next/navigation";

import { Calendar, FolderKanban, Users } from "lucide-react";
import { DashboardProject } from "@/types/dashboard"; // ← changed

interface Props {
  project: DashboardProject; // ← changed
}

export default function ProjectCard({ project }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/workspaces/${project.workspaceId}/projects/${project.id}`)}
      className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg hover:border-blue-300"
    >
      <div className="mb-6 flex items-start gap-4">
        <div className="rounded-xl bg-blue-100 p-3">
          <FolderKanban size={22} className="text-blue-600" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-slate-900">{project.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-slate-500">
            {project.description || "No description provided."}
          </p>
        </div>
      </div>

      <div className="space-y-3 border-t border-slate-100 pt-5">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Users size={16} />
          {project.members.length} Members
        </div>

        {(project.startDate || project.endDate) && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar size={16} />
            {project.startDate ? new Date(project.startDate).toLocaleDateString() : "--"}
            {" - "}
            {project.endDate ? new Date(project.endDate).toLocaleDateString() : "--"}
          </div>
        )}
      </div>
    </div>
  );
}
