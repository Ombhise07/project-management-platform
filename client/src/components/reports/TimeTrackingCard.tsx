type Props = {
  report: any;
};

export default function TimeTrackingCard({ report }: Props) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow">
      <h2 className="mb-4 text-xl font-semibold">Time Tracking</h2>

      <div>
        Total Hours:
        {report.totalHours}
      </div>

      <div>
        Projects:
        {report.projects}
      </div>

      <div>
        Tasks:
        {report.tasks}
      </div>
    </div>
  );
}
