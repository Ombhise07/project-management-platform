"use client";

import { useEffect, useState } from "react";

import { DragDropContext } from "@hello-pangea/dnd";

import KanbanColumn from "./KanbanColumn";

import { updateTask } from "@/services/task.service";

export default function KanbanBoard({ data }: any) {
  const [board, setBoard] = useState(data);

  useEffect(() => {
    setBoard(data);
  }, [data]);

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const sourceColumn = source.droppableId;

    const destinationColumn = destination.droppableId;

    const sourceTasks = [...board[sourceColumn]];

    const destinationTasks =
      sourceColumn === destinationColumn ? sourceTasks : [...board[destinationColumn]];

    const [movedTask] = sourceTasks.splice(source.index, 1);

    movedTask.status = destinationColumn;

    destinationTasks.splice(destination.index, 0, movedTask);

    const newBoard = {
      ...board,
      [sourceColumn]: sourceColumn === destinationColumn ? destinationTasks : sourceTasks,
      [destinationColumn]: destinationTasks,
    };

    setBoard(newBoard);

    try {
      await updateTask(draggableId, {
        status: destinationColumn,
      });
    } catch (error) {
      console.error(error);

      setBoard(board);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto">
        <KanbanColumn title="TODO" tasks={board.TODO} />

        <KanbanColumn title="IN_PROGRESS" tasks={board.IN_PROGRESS} />

        <KanbanColumn title="IN_REVIEW" tasks={board.IN_REVIEW} />

        <KanbanColumn title="DONE" tasks={board.DONE} />
      </div>
    </DragDropContext>
  );
}
