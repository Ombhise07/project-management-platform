// export interface Project {
//   id: string;
//   name: string;
//   status: "Planning" | "In Progress" | "Completed";
//   progress: number;
//   totalTasks: number;
// }

export interface ProjectMember {
  id: string;
  userId: string;
  role: "OWNER" | "MANAGER" | "MEMBER";

  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Project {
  id: string;
  name: string;
  description?: string;

  startDate?: string | null;
  endDate?: string | null;

  workspaceId: string;

  createdAt: string;
  updatedAt: string;

  members: ProjectMember[];
}
