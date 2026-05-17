"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { JobCard } from "@/components/jobs/JobCard";
import type { JobSearchRequest, JobsResponseMeta, NormalizedJob } from "@/lib/jobs/types";

interface JobsListProps {
  jobs: NormalizedJob[];
  request: JobSearchRequest;
  meta: JobsResponseMeta;
}

function buildPageHref(
  request: JobSearchRequest,
  page: number,
  pageToken?: string,
  pageTokenTrail?: string[],
) {
  const searchParams = new URLSearchParams({
    q: request.query,
    location: request.location,
    gl: request.gl,
    hl: request.hl,
    mode: request.mode,
    pageSize: String(request.pageSize),
    page: String(page),
  });

  if (request.preset) {
    searchParams.set("preset", request.preset);
  }

  if (request.chips) {
    searchParams.set("chips", request.chips);
  }

  if (request.datePosted) {
    searchParams.set("datePosted", request.datePosted);
  }

  if (pageToken) {
    searchParams.set("pageToken", pageToken);
  }

  if (pageTokenTrail && pageTokenTrail.length > 0) {
    searchParams.set("pageTokenTrail", pageTokenTrail.join(","));
  }

  return `/?${searchParams.toString()}`;
}

export function JobsList({ jobs, request, meta }: JobsListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingDirection, setPendingDirection] = useState<"previous" | "next" | null>(null);
  if (jobs.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-10 text-center text-slate-400">
        Nenhuma vaga encontrada para os filtros atuais.
      </section>
    );
  }

  const previousPageToken = request.page > 2
    ? request.pageTokenTrail[request.page - 3]
    : undefined;
  const previousPageTrail = request.page > 2
    ? request.pageTokenTrail.slice(0, request.page - 2)
    : [];
  const nextPageTrail = meta.nextPageToken
    ? [...request.pageTokenTrail, meta.nextPageToken]
    : request.pageTokenTrail;

  function navigateToPage(
    direction: "previous" | "next",
    page: number,
    pageToken?: string,
    pageTokenTrail?: string[],
  ) {
    setPendingDirection(direction);
    startTransition(() => {
      router.push(buildPageHref(request, page, pageToken, pageTokenTrail));
    });
  }

  return (
    <section className="space-y-4">
      {isPending ? (
        <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-100">
          Carregando resultados...
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
        <p>
          Página {meta.pageIndex} · {meta.totalJobs} resultado(s) nesta página
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {meta.hasPreviousPage ? (
            <button
              className="rounded-full border border-slate-500/60 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-300 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isPending}
              onClick={() => navigateToPage("previous", request.page - 1, previousPageToken, previousPageTrail)}
              type="button"
            >
              {isPending && pendingDirection === "previous" ? "Carregando..." : "Anterior"}
            </button>
          ) : null}
          {meta.hasNextPage ? (
            <button
              className="rounded-full bg-sky-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-200 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isPending}
              onClick={() => navigateToPage("next", request.page + 1, meta.nextPageToken, nextPageTrail)}
              type="button"
            >
              {isPending && pendingDirection === "next" ? "Carregando..." : "Próxima"}
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
