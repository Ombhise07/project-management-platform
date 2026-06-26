import { User } from "lucide-react";

interface Props {
  assignee?: {
    name: string;
    email: string;
  } | null;
}

export default function TaskAssignee({ assignee }: Props) {
  if (!assignee) {
    return (
      <div className="flex items-center gap-2 text-slate-400">
        <User size={18} />

        <span>Unassigned</span>
      </div>
    );
  }

  const initials = assignee.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
        {initials}
      </div>

      <div>
        <p className="text-sm font-medium">{assignee.name}</p>

        <p className="text-xs text-slate-500">{assignee.email}</p>
      </div>
    </div>
  );
}
