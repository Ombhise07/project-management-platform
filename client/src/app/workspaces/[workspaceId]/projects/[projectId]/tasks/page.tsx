"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { EmptyTasks, TaskFilters, TasksTable } from "@/components/task";

import Loader from "@/components/common/Loader";

import { getProjectTasks } from "@/services/task.service";

import { useProjectStore } from "@/store/project.store";

import { Task } from "@/types/task";

import { TaskDrawer } from "@/components/task";

import { useTaskStore } from "@/store/task.store";

export default function TasksPage() {
  const { projectId } = useParams();

  const project = useProjectStore((state) => state.project);

  const { openDrawer, setSelectedTask } = useTaskStore();

  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  const loadTasks = async () => {
    try {
      const response = await getProjectTasks(projectId as string);

      setTasks(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "ALL" || task.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, status]);

  if (!project) return <Loader />;

  if (loading) return <Loader />;

  return (
    <>
      <TaskFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onCreateTask={() => {}}
      />

      {filteredTasks.length === 0 ? (
        <EmptyTasks onCreateTask={() => {}} />
      ) : (
        <TasksTable
          tasks={filteredTasks}
          onTaskClick={(task) => {
            setSelectedTask(task);
            openDrawer();
          }}
        />
      )}
      <TaskDrawer />
    </>
  );
}
