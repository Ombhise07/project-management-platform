// src/types/dashboard.ts

export interface DashboardSummary {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
}

export interface DashboardProjectOwner {
  user: {
    id: string;
    name: string;
  };
}

export interface DashboardProject {
  id: string;
  name: string;
  description?: string | null;
  status: string;
  startDate?: string | null;
  endDate?: string | null;
  createdAt: string;
  members: DashboardProjectOwner[]; // owner via ProjectMember
  _count: {
    tasks: number;
  };
}

export interface DashboardData {
  summary: DashboardSummary;
  recentProjects: DashboardProject[];
  // these come from backend but weren't in your type yet:
  recentActivities: {
    id: string;
    type: string;
    message: string;
    userId: string;
    createdAt: string;
  }[];
  recentNotifications: {
    id: string;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: string;
  }[];
}
