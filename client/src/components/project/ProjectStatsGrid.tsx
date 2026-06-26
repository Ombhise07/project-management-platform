import { FolderKanban, Users } from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";
import { Project } from "@/types/project";

interface Props {
  project: Project;
}

export default function ProjectStatsGrid({ project }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <StatCard title="Project Members" value={project.members.length} icon={Users} />

      <StatCard title="Project" value={1} icon={FolderKanban} />
    </div>
  );
}
