import { Users } from "lucide-react";

import { Project } from "@/types/project";

interface Props {
  project: Project;
}

export default function ProjectMembersCard({ project }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <Users className="text-blue-600" size={22} />

        <h2 className="text-lg font-semibold">Members</h2>
      </div>

      {project.members.length === 0 ? (
        <p className="text-sm text-slate-500">No members added yet.</p>
      ) : (
        <div className="space-y-4">
          {project.members.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <span className="font-medium">{member.user.name}</span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
