interface Props {
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
}

const priorityStyles = {
  LOW: "bg-green-100 text-green-700",

  MEDIUM: "bg-yellow-100 text-yellow-700",

  HIGH: "bg-orange-100 text-orange-700",

  URGENT: "bg-red-100 text-red-700",
};

export default function TaskPriorityBadge({ priority }: Props) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[priority]}`}
    >
      {priority}
    </span>
  );
}
