import { CheckCircle2, Circle } from "lucide-react";

import { Task } from "@/types/task";

interface Props {
  task: Task;
}

export default function TaskDrawerSubtasks({ task }: Props) {
  return (
    <div className="border-t p-6">
      <h3 className="mb-5 text-lg font-semibold">Subtasks</h3>

      {task.subtasks.length === 0 ? (
        <p className="text-sm text-slate-500">No subtasks available.</p>
      ) : (
        <div className="space-y-3">
          {task.subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center gap-3">
              {subtask.completed ? (
                <CheckCircle2 size={18} className="text-green-600" />
              ) : (
                <Circle size={18} className="text-slate-400" />
              )}

              <span className={subtask.completed ? "line-through text-slate-400" : ""}>
                {subtask.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
