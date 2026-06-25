import { BriefcaseBusiness, ArrowRight, Users, FolderKanban } from "lucide-react";

type WorkspaceCardProps = {
  id: string;
  name: string;
  description: string;
  projects: number;
  members: number;
  onClick: (id: string) => void;
};

export default function WorkspaceCard({
  id,
  name,
  description,
  projects,
  members,
  onClick,
}: WorkspaceCardProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className="group flex h-64 w-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
    >
      <div>
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
          <BriefcaseBusiness size={28} className="text-blue-600" />
        </div>

        <h3 className="text-xl font-semibold text-slate-900">{name}</h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 pt-4">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <FolderKanban size={18} className="text-slate-400" />

            <span className="text-sm text-slate-600">{projects}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={18} className="text-slate-400" />

            <span className="text-sm text-slate-600">{members}</span>
          </div>
        </div>

        <ArrowRight
          size={20}
          className="text-blue-600 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>
    </button>
  );
}
