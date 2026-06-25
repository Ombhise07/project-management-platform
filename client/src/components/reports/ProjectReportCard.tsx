type Props = {
  report: any;
};

export default function ProjectReportCard({ report }: Props) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow">
      <h2 className="mb-4 text-xl font-semibold">Project Progress</h2>

      <div>Total Tasks: {report.totalTasks}</div>

      <div>
        Completed Tasks:
        {report.completedTasks}
      </div>

      <div>
        Overdue Tasks:
        {report.overdueTasks}
      </div>

      <div className="mt-3 text-lg font-bold text-green-600">{report.completionRate}%</div>
    </div>
  );
}
