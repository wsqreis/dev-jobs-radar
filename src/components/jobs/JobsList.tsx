import type { NormalizedJob } from "@/lib/jobs/types";
import { JobCard } from "@/components/jobs/JobCard";

interface JobsListProps {
  jobs: NormalizedJob[];
}

export function JobsList({ jobs }: JobsListProps) {
  if (jobs.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-10 text-center text-slate-400">
        Nenhuma vaga encontrada para os filtros atuais.
      </section>
    );
  }

  return (
    <section className="grid gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </section>
  );
}
