import { ClipboardList } from "lucide-react";

import { Button } from "@/components/ui";

interface Props {
  onCreateTask: () => void;
}

export default function EmptyTasks({ onCreateTask }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
      <ClipboardList size={60} className="mx-auto text-slate-300" />

      <h2 className="mt-6 text-xl font-semibold">No Tasks Found</h2>

      <p className="mt-2 text-slate-500">Create your first task for this project.</p>

      <Button className="mt-6" onClick={onCreateTask}>
        Create Task
      </Button>
    </div>
  );
}
