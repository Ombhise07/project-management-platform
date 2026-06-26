"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  workspaceId: string;
  projectName: string;
  description?: string;
}

export default function ProjectHeader({ workspaceId, projectName, description }: Props) {
  const router = useRouter();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-24 items-center justify-between px-8">
        <div className="flex items-center gap-5">
          <button
            onClick={() => router.push(`/workspaces/${workspaceId}/projects`)}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <ArrowLeft size={22} className="text-slate-700" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">{projectName}</h1>

            {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
          </div>
        </div>
      </div>
    </header>
  );
}
