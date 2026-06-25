"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getBoardData } from "@/services/task.service";

import KanbanBoard from "@/components/kanban/KanbanBoard";

import { useProjectStore } from "@/store/project.store";

export default function ProjectBoardPage() {
  const params = useParams();

  const projectId = params.projectId as string;

  const setProjectId = useProjectStore((state) => state.setProjectId);

  const [boardData, setBoardData] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const response = await getBoardData(projectId);

        setBoardData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      loadBoard();
    }

    if (projectId) {
      setProjectId(projectId);
    }
  }, [projectId, setProjectId]);

  if (loading) {
    return <div className="p-8">Loading board...</div>;
  }

  return (
    <div className="p-6">
      <KanbanBoard data={boardData} />
    </div>
  );
}
