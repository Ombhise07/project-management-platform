import { FolderKanban } from "lucide-react";
import { Button } from "@/components/ui";

interface Props {
  onCreateProject: () => void;
}

export default function EmptyProjects({ onCreateProject }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
        <FolderKanban size={40} className="text-blue-600" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-slate-900">No Projects Yet</h2>

      <p className="mt-3 text-slate-500">Create your first project to start managing work.</p>

      <Button className="mt-8" onClick={onCreateProject}>
        Create Project
      </Button>
    </div>
  );
}
