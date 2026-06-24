export default function TaskCard({ task }: any) {
  return (
    <div className="rounded border bg-white p-3 shadow">
      <h3>{task.title}</h3>

      <p className="text-sm text-gray-500">{task.priority}</p>
    </div>
  );
}
