type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
};

export default function ReportCard({ title, value, subtitle }: Props) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="text-sm text-gray-500">{title}</h3>

      <p className="mt-2 text-3xl font-bold">{value}</p>

      {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}
