type Props = {
  team: any[];
};

export default function TeamProductivityCard({ team }: Props) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow">
      <h2 className="mb-4 text-xl font-semibold">Team Productivity</h2>

      <div className="space-y-4">
        {team.map((member) => (
          <div key={member.id} className="rounded border p-3">
            <div className="font-semibold">{member.name}</div>

            <div>{member.email}</div>

            <div>
              Assigned Tasks:
              {member.assignedTasks.length}
            </div>

            <div>
              Time Logs:
              {member.timeLogs.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
