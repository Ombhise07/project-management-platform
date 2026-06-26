interface Props {
  status: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
}

const statusStyles = {
  TODO: "bg-slate-100 text-slate-700",

  IN_PROGRESS: "bg-blue-100 text-blue-700",

  IN_REVIEW: "bg-amber-100 text-amber-700",

  DONE: "bg-green-100 text-green-700",
};

const statusLabels = {
  TODO: "To Do",

  IN_PROGRESS: "In Progress",

  IN_REVIEW: "In Review",

  DONE: "Done",
};

export default function TaskStatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
