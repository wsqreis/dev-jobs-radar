import type { NormalizedJob } from "@/lib/jobs/types";
import { ExpandableDescription } from "@/components/jobs/ExpandableDescription";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Clock3,
  ExternalLink,
  MapPin,
} from "lucide-react";

interface JobCardProps {
  job: NormalizedJob;
}

function getInitials(companyName: string) {
  return companyName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function JobCard({ job }: JobCardProps) {
  const primaryApply = job.applyOptions[0];
  const secondaryLinks = [
    ...job.applyOptions.slice(1, 2),
    ...job.relatedLinks.slice(0, 1),
  ];

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700">
              {getInitials(job.companyName) || <Building2 aria-hidden="true" size={18} />}
            </div>
            <div className="min-w-0 space-y-2">
              <div>
                <p className="flex items-center gap-1.5 text-sm font-medium text-blue-700">
                  <Building2 aria-hidden="true" size={15} />
                  {job.companyName}
                  {job.via ? <span className="text-slate-400">via {job.via}</span> : null}
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
                  {job.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1">
                  <MapPin aria-hidden="true" size={14} />
                  {job.location}
                </span>
                {job.scheduleType ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
                    <BriefcaseBusiness aria-hidden="true" size={14} />
                    {job.scheduleType}
                  </span>
                ) : null}
                {job.postedAt ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">
                    <Clock3 aria-hidden="true" size={14} />
                    {job.postedAt}
                  </span>
                ) : null}
              </div>

              <ExpandableDescription text={job.description} />

              {job.detectedExtensions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {job.detectedExtensions.slice(0, 5).map((extension) => (
                    <span
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                      key={`${job.id}-${extension}`}
                    >
                      {extension}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:min-w-44">
          {primaryApply ? (
            <a
              aria-label={`Candidatar-se para ${job.title} em ${job.companyName}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
              href={primaryApply.url}
              rel="noreferrer"
              target="_blank"
            >
              Candidatar
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          ) : null}
          {secondaryLinks.map((link) => (
            <a
              aria-label={`Ver detalhes de ${job.title} em ${job.companyName}`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={link.url}
              key={`${job.id}-${link.url}`}
              rel="noreferrer"
              target="_blank"
            >
              Detalhes
              <ExternalLink aria-hidden="true" size={15} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
