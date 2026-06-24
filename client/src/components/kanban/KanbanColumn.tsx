import { Droppable, Draggable } from "@hello-pangea/dnd";

import TaskCard from "./TaskCard";

export default function KanbanColumn({ title, tasks }: any) {
  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-80 rounded bg-gray-100 p-4"
        >
          <h2 className="mb-4 font-bold">{title}</h2>

          {tasks.map((task: any, index: number) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskCard task={task} />
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
