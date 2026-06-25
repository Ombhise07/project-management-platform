import { Workspace } from "@/types/workspace";

type Props = {
  workspaces: Workspace[];
  onWorkspaceClick: (id: string) => void;
};

export default function WorkspaceGrid({ workspaces, onWorkspaceClick }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {workspaces.map((workspace) => (
        <WorkspaceCard key={workspace.id} {...workspace} onClick={onWorkspaceClick} />
      ))}
    </div>
  );
}
