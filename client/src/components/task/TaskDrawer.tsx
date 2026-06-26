"use client";

import { useTaskStore } from "@/store/task.store";

import TaskDrawerActions from "./TaskDrawerActions";
import TaskDrawerHeader from "./TaskDrawerHeader";
import TaskDrawerInfo from "./TaskDrawerInfo";
import TaskDrawerSubtasks from "./TaskDrawerSubtasks";

export default function TaskDrawer() {
  const { selectedTask, isDrawerOpen, closeDrawer } = useTaskStore();

  if (!selectedTask || !isDrawerOpen) return null;

  return (
    <>
      <div onClick={closeDrawer} className="fixed inset-0 z-40 bg-black/40" />

      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-lg flex-col overflow-y-auto bg-white shadow-2xl">
        <TaskDrawerHeader task={selectedTask} onClose={closeDrawer} />

        <TaskDrawerInfo task={selectedTask} />

        <TaskDrawerSubtasks task={selectedTask} />

        <TaskDrawerActions onEdit={() => {}} onDelete={() => {}} />
      </div>
    </>
  );
}
