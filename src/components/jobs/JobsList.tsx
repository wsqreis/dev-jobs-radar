"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";
import { JobCard } from "@/components/jobs/JobCard";
import type {
  JobSearchRequest,
  JobsResponseMeta,
  NormalizedJob,
} from "@/lib/jobs/types";

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
    gl: request.gl,
    hl: request.hl,
    location: request.location,
    mode: request.mode,
    page: String(page),
    pageSize: String(request.pageSize),
    q: request.query,
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
  const [pendingDirection, setPendingDirection] = useState<"next" | "previous" | null>(null);

  if (jobs.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-950">Nenhuma vaga encontrada</p>
        <p className="mt-2 text-sm text-slate-500">Ajuste a busca ou troque o preset ativo.</p>
      </section>
    );
  }

  const previousPageToken =
    request.page > 2 ? request.pageTokenTrail[request.page - 3] : undefined;
  const previousPageTrail =
    request.page > 2 ? request.pageTokenTrail.slice(0, request.page - 2) : [];
  const nextPageTrail = meta.nextPageToken
    ? [...request.pageTokenTrail, meta.nextPageToken]
    : request.pageTokenTrail;

  function navigateToPage(
    direction: "next" | "previous",
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
      <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-600">
          Página {meta.pageIndex} · {meta.totalJobs} resultado(s) nesta página
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isPending ? (
            <span className="inline-flex items-center gap-2 text-sm text-blue-700">
              <LoaderCircle aria-hidden="true" className="animate-spin" size={16} />
              Carregando...
            </span>
          ) : null}
          {meta.hasPreviousPage ? (
            <button
              className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isPending}
              onClick={() =>
                navigateToPage("previous", request.page - 1, previousPageToken, previousPageTrail)
              }
              type="button"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              {isPending && pendingDirection === "previous" ? "Carregando..." : "Anterior"}
            </button>
          ) : null}
          {meta.hasNextPage ? (
            <button
              className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isPending}
              onClick={() =>
                navigateToPage("next", request.page + 1, meta.nextPageToken, nextPageTrail)
              }
              type="button"
            >
              {isPending && pendingDirection === "next" ? "Carregando..." : "Próxima"}
              <ArrowRight aria-hidden="true" size={16} />
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </section>
  );
}
