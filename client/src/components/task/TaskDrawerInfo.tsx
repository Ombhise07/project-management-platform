import { CalendarDays } from "lucide-react";

import { Task } from "@/types/task";

import TaskAssignee from "./TaskAssignee";

interface Props {
  task: Task;
}

export default function TaskDrawerInfo({ task }: Props) {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="mb-2 font-semibold">Assignee</h3>

        <TaskAssignee assignee={task.assignee} />
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Progress</h3>

        <div className="h-3 rounded-full bg-slate-200">
          <div
            className="h-3 rounded-full bg-blue-600"
            style={{
              width: `${task.progress}%`,
            }}
          />
        </div>

        <p className="mt-2 text-sm">{task.progress}% Complete</p>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Dates</h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            Start:
            {task.startDate ? new Date(task.startDate).toLocaleDateString() : "--"}
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            Due:
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "--"}
          </div>
        </div>
      </div>
    </div>
  );
}
