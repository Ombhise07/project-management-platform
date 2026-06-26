"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface WorkspaceHeaderProps {
  workspaceName: string;
}

export default function WorkspaceHeader({ workspaceName }: WorkspaceHeaderProps) {
  const router = useRouter();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-5">
          <button
            onClick={() => router.push("/workspace")}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <ArrowLeft size={22} className="text-slate-700" />
          </button>

          <div>
            <p className="text-sm text-slate-500">Workspace</p>

            <h1 className="text-2xl font-bold text-slate-900">{workspaceName}</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
