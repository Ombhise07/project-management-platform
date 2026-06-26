export type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface TaskAssignee {
  id: string;
  name: string;
  email: string;
}

export interface Subtask {
  id: string;

  title: string;

  completed: boolean;
}

export interface Task {
  id: string;

  title: string;

  description?: string | null;

  status: TaskStatus;

  priority: TaskPriority;

  progress: number;

  projectId: string;

  startDate?: string | null;

  dueDate?: string | null;

  assigneeId?: string | null;

  assignee?: TaskAssignee | null;

  subtasks: Subtask[];

  createdAt: string;

  updatedAt: string;
}
