import { Plus } from "lucide-react";

import { Button } from "@/components/ui";

type WorkspaceHeaderProps = {
  onCreateWorkspace: () => void;
};

export default function WorkspaceHeader({ onCreateWorkspace }: WorkspaceHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Select Workspace</h1>

        <p className="mt-3 max-w-2xl text-slate-500">
          Welcome back. Choose a workspace to continue, or create a new one.
        </p>
      </div>

      <Button onClick={onCreateWorkspace} className="gap-2">
        <Plus size={18} />
        Create Workspace
      </Button>
    </div>
  );
}
