import { DashboardProject } from "@/types/dashboard"; // ← change import
import ProjectCard from "../layouts/project/ProjectCard";

interface Props {
  projects: DashboardProject[]; // ← use DashboardProject, not Project
}

export default function RecentProjects({ projects }: Props) {
  return (
    <section className="mt-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Recent Projects</h2>
        <p className="mt-1 text-sm text-slate-500">Recently created projects in this workspace.</p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          No projects found.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
