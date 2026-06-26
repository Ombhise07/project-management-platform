import { ReactNode } from "react";

import ProjectHeader from "./ProjectHeader";
import ProjectSidebar from "./ProjectSidebar";

interface Props {
  children: ReactNode;

  workspaceId: string;

  projectId: string;

  projectName: string;

  description?: string;
}

export default function ProjectLayout({
  children,
  workspaceId,
  projectId,
  projectName,
  description,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      <ProjectHeader
        workspaceId={workspaceId}
        projectName={projectName}
        description={description}
      />

      <div className="flex">
        <ProjectSidebar workspaceId={workspaceId} projectId={projectId} />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
