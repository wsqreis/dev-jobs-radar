import type { NormalizedJob } from "@/lib/jobs/types";

interface JobCardProps {
  job: NormalizedJob;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm text-sky-200">{job.companyName}</p>
            <h3 className="text-2xl font-semibold text-white">{job.title}</h3>
            <p className="text-sm text-slate-400">
              {job.location}
              {job.scheduleType ? ` · ${job.scheduleType}` : ""}
              {job.postedAt ? ` · ${job.postedAt}` : ""}
            </p>
          </div>

          <p className="max-w-3xl text-sm leading-7 text-slate-300">
            {job.description}
          </p>

          {job.detectedExtensions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {job.detectedExtensions.map((extension) => (
                <span
                  key={`${job.id}-${extension}`}
                  className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs text-sky-100"
                >
                  {extension}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex min-w-44 flex-col gap-3">
          {job.applyOptions.slice(0, 2).map((option) => (
            <a
              key={`${job.id}-${option.url}`}
              className="rounded-full border border-sky-300 bg-sky-300 px-4 py-2 text-center text-sm font-semibold text-slate-950 transition hover:border-sky-200 hover:bg-sky-200"
              href={option.url}
              rel="noreferrer"
              target="_blank"
            >
              {option.title}
            </a>
          ))}
          {job.relatedLinks.slice(0, 1).map((link) => (
            <a
              key={`${job.id}-${link.url}`}
              className="rounded-full border border-white/10 px-4 py-2 text-center text-sm text-slate-300 transition hover:border-slate-400 hover:text-white"
              href={link.url}
              rel="noreferrer"
              target="_blank"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
