"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { getTaskTimeSummary } from "@/services/time.service";

export default function TimePage() {
  const params = useParams();

  const taskId = params.taskId as string;

  const [data, setData] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getTaskTimeSummary(taskId);

        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      load();
    }
  }, [taskId]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!data) {
    return <div className="p-6">No Data Found</div>;
  }

  const hours = Math.floor(data.totalMinutes / 60);

  const minutes = data.totalMinutes % 60;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold">{data.task?.title}</h1>

      <div className="mb-8 rounded border p-4">
        <h2 className="text-xl font-semibold">Total Time</h2>

        <p className="text-2xl">
          {hours}h {minutes}m
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Logs</h2>

        <div className="space-y-3">
          {data.logs.map((log: any) => (
            <div key={log.id} className="rounded border p-3">
              <div className="font-medium">
                {Math.floor(log.minutes / 60)}h {log.minutes % 60}m
              </div>

              <div className="text-gray-600">{log.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
