import { CalendarDays, FolderKanban } from "lucide-react";

import { Project } from "@/types/project";

interface Props {
  project: Project;
}

export default function ProjectInfoCard({ project }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-3">
          <FolderKanban className="text-blue-600" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold">{project.name}</h2>

          <p className="text-sm text-slate-500">
            {project.description || "No description available."}
          </p>
        </div>
      </div>

      {(project.startDate || project.endDate) && (
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays size={18} />

          <span>
            {project.startDate ? new Date(project.startDate).toLocaleDateString() : "--"}

            {"  →  "}

            {project.endDate ? new Date(project.endDate).toLocaleDateString() : "--"}
          </span>
        </div>
      )}
    </div>
  );
}
