type Props = {
  tasks: any[];
};

export default function OverdueTasksCard({ tasks }: Props) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow">
      <h2 className="mb-4 text-xl font-semibold">Overdue Tasks</h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="rounded border p-3">
            <div className="font-semibold">{task.title}</div>

            <div>
              Project:
              {task.project.name}
            </div>

            <div>
              Assignee:
              {task.assignee?.name ?? "Unassigned"}
            </div>

            <div>
              Due:
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          </div>
        ))}

        {tasks.length === 0 && <p>No overdue tasks 🎉</p>}
      </div>
    </div>
  );
}
