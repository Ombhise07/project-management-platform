import { Project } from "@/types/project";

import ProjectInfoCard from "./ProjectInfoCard";
import ProjectMembersCard from "./ProjectMembersCard";
import ProjectStatsGrid from "./ProjectStatsGrid";

interface Props {
  project: Project;
}

export default function ProjectOverview({ project }: Props) {
  return (
    <div className="space-y-8">
      <ProjectStatsGrid project={project} />

      <div className="grid gap-8 xl:grid-cols-2">
        <ProjectInfoCard project={project} />

        <ProjectMembersCard project={project} />
      </div>
    </div>
  );
}
