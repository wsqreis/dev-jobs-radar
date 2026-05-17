"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { jobSearchPresets } from "@/lib/jobs/presets";
import type { JobSearchRequest } from "@/lib/jobs/types";

const pageSizeOptions = [5, 10] as const;
const datePostedOptions = [
  { value: "", label: "Qualquer data" },
  { value: "24h", label: "Últimas 24 horas" },
  { value: "3d", label: "Últimos 3 dias" },
  { value: "7d", label: "Última semana" },
] as const;

function buildPresetHref(request: JobSearchRequest, presetId: string) {
  const searchParams = new URLSearchParams({
    preset: presetId,
    mode: request.mode,
    pageSize: String(request.pageSize),
    page: "1",
  });

  if (request.datePosted) {
    searchParams.set("datePosted", request.datePosted);
  }

  return `/?${searchParams.toString()}`;
}

interface SearchFormProps {
  request: JobSearchRequest;
}

export function SearchForm({ request }: SearchFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingTarget, setPendingTarget] = useState<"search" | "preset" | null>(null);
  const [pendingPresetId, setPendingPresetId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState(() => ({
    q: request.query,
    location: request.location,
    gl: request.gl,
    hl: request.hl,
    mode: request.mode,
    pageSize: String(request.pageSize),
    datePosted: request.datePosted ?? "",
  }));

  useEffect(() => {
    setFormValues({
      q: request.query,
      location: request.location,
      gl: request.gl,
      hl: request.hl,
      mode: request.mode,
      pageSize: String(request.pageSize),
      datePosted: request.datePosted ?? "",
    });
    setPendingTarget(null);
    setPendingPresetId(null);
  }, [request]);

  function handleSubmit(formData: FormData) {
    const searchParams = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      const normalizedValue = String(value).trim();
      if (normalizedValue) {
        searchParams.set(key, normalizedValue);
      }
    }

    searchParams.set("page", "1");
    searchParams.delete("pageToken");
    searchParams.delete("pageTokenTrail");

    setPendingTarget("search");
    startTransition(() => {
      router.push(`/?${searchParams.toString()}`);
    });
  }

  function handlePresetNavigation(href: string, presetId: string) {
    setPendingTarget("preset");
    setPendingPresetId(presetId);
    startTransition(() => {
      router.push(href);
    });
  }

  return (
    <form
      action={handleSubmit}
      className="grid gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-200" htmlFor="q">
          Busca principal
        </label>
        <input
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
          onChange={(event) => setFormValues((current) => ({ ...current, q: event.target.value }))}
          value={formValues.q}
          id="q"
          name="q"
          placeholder="desenvolvedor backend remoto"
          type="text"
        />
      </div>

      {isPending ? (
        <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-100">
          Carregando resultados...
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="location">
            Localização
          </label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
            onChange={(event) => setFormValues((current) => ({ ...current, location: event.target.value }))}
            value={formValues.location}
            id="location"
            name="location"
            placeholder="Brazil"
            type="text"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="gl">
            gl
          </label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
            onChange={(event) => setFormValues((current) => ({ ...current, gl: event.target.value }))}
            value={formValues.gl}
            id="gl"
            name="gl"
            placeholder="br"
            type="text"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="hl">
            hl
          </label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
            onChange={(event) => setFormValues((current) => ({ ...current, hl: event.target.value }))}
            value={formValues.hl}
            id="hl"
            name="hl"
            placeholder="pt-br"
            type="text"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="mode">
            Modo
          </label>
          <select
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 [&>option]:bg-slate-950 [&>option]:text-white"
            onChange={(event) => setFormValues((current) => ({ ...current, mode: event.target.value as JobSearchRequest["mode"] }))}
            value={formValues.mode}
            id="mode"
            name="mode"
          >
            <option value="auto">Auto</option>
            <option value="demo">Demo</option>
            <option value="live">Live</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="pageSize">
            Resultados por página
          </label>
          <select
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 [&>option]:bg-slate-950 [&>option]:text-white"
            onChange={(event) => setFormValues((current) => ({ ...current, pageSize: event.target.value }))}
            value={formValues.pageSize}
            id="pageSize"
            name="pageSize"
          >
            {pageSizeOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="datePosted">
            Data da vaga
          </label>
          <select
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400 [&>option]:bg-slate-950 [&>option]:text-white"
            onChange={(event) => setFormValues((current) => ({ ...current, datePosted: event.target.value }))}
            value={formValues.datePosted}
            id="datePosted"
            name="datePosted"
          >
            {datePostedOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-200">Presets</p>
        <div className="flex flex-wrap gap-3">
          {jobSearchPresets.map((preset) => {
            const href = buildPresetHref(request, preset.id);

            return (
              <button
                key={preset.id}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${request.preset === preset.id ? "border-sky-300 bg-sky-300 text-slate-950 shadow-sm shadow-sky-950/20" : "border-slate-500/60 bg-slate-800 text-slate-100 hover:border-sky-300 hover:bg-slate-700 hover:text-white"} disabled:cursor-not-allowed disabled:opacity-60`}
                disabled={isPending}
                onClick={() => handlePresetNavigation(href, preset.id)}
                type="button"
              >
                {isPending && pendingTarget === "preset" && pendingPresetId === preset.id ? "Carregando..." : preset.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input name="page" type="hidden" value="1" />
        <button
          className="rounded-full bg-sky-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-200 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending && pendingTarget === "search" ? "Buscando..." : "Buscar vagas"}
        </button>
        <Link
          className="rounded-full border border-slate-500/60 bg-slate-800 px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-sky-300 hover:bg-slate-700 hover:text-white"
          href="/"
        >
          Limpar filtros
        </Link>
      </div>
    </form>
  );
}
