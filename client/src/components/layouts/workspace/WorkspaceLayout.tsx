import { ReactNode } from "react";

import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceSidebar from "./WorkspaceSidebar";

interface Props {
  children: ReactNode;
  workspaceId: string;
  workspaceName: string;
}

export default function WorkspaceLayout({ children, workspaceId, workspaceName }: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      <WorkspaceHeader workspaceName={workspaceName} />

      <div className="flex">
        <WorkspaceSidebar workspaceId={workspaceId} />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
