"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  CalendarClock,
  Globe2,
  Languages,
  LoaderCircle,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
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
  const [pendingTarget, setPendingTarget] = useState<"preset" | "search" | null>(null);
  const [pendingPresetId, setPendingPresetId] = useState<string | null>(null);
  const formKey = [
    request.query,
    request.location,
    request.gl,
    request.hl,
    request.mode,
    request.pageSize,
    request.datePosted ?? "",
  ].join("|");

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
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      key={formKey}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="min-w-0 flex-1 space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="q">
            Busca principal
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              className="h-12 w-full rounded-md border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              defaultValue={request.query}
              id="q"
              name="q"
              placeholder="desenvolvedor backend remoto"
              type="text"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:w-[520px] lg:grid-cols-4">
          <Field
            htmlFor="location"
            icon={<MapPin aria-hidden="true" size={16} />}
            label="Localização"
          >
            <input
              className="field-control"
              defaultValue={request.location}
              id="location"
              name="location"
              placeholder="Brazil"
              type="text"
            />
          </Field>

          <Field htmlFor="gl" icon={<Globe2 aria-hidden="true" size={16} />} label="gl">
            <input
              className="field-control"
              defaultValue={request.gl}
              id="gl"
              name="gl"
              placeholder="br"
              type="text"
            />
          </Field>

          <Field htmlFor="hl" icon={<Languages aria-hidden="true" size={16} />} label="hl">
            <input
              className="field-control"
              defaultValue={request.hl}
              id="hl"
              name="hl"
              placeholder="pt-br"
              type="text"
            />
          </Field>

          <Field
            htmlFor="mode"
            icon={<SlidersHorizontal aria-hidden="true" size={16} />}
            label="Modo"
          >
            <select
              className="field-control"
              defaultValue={request.mode}
              id="mode"
              name="mode"
            >
              <option value="auto">Auto</option>
              <option value="demo">Demo</option>
              <option value="live">Live</option>
            </select>
          </Field>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_180px_180px]">
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Sparkles aria-hidden="true" size={16} />
            Presets
          </p>
          <div className="flex flex-wrap gap-2">
            {jobSearchPresets.map((preset) => {
              const href = buildPresetHref(request, preset.id);
              const isActive = request.preset === preset.id;
              const isLoading =
                isPending && pendingTarget === "preset" && pendingPresetId === preset.id;

              return (
                <button
                  className={`inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
                    isActive
                      ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                  disabled={isPending}
                  key={preset.id}
                  onClick={() => handlePresetNavigation(href, preset.id)}
                  type="button"
                >
                  {isLoading ? "Carregando..." : preset.label}
                </button>
              );
            })}
          </div>
        </div>

        <Field
          htmlFor="pageSize"
          icon={<SlidersHorizontal aria-hidden="true" size={16} />}
          label="Resultados"
        >
          <select
            className="field-control"
            defaultValue={String(request.pageSize)}
            id="pageSize"
            name="pageSize"
          >
            {pageSizeOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </Field>

        <Field
          htmlFor="datePosted"
          icon={<CalendarClock aria-hidden="true" size={16} />}
          label="Data da vaga"
        >
          <select
            className="field-control"
            defaultValue={request.datePosted ?? ""}
            id="datePosted"
            name="datePosted"
          >
            {datePostedOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
        {isPending ? (
          <div className="inline-flex items-center gap-2 text-sm text-blue-700">
            <LoaderCircle aria-hidden="true" className="animate-spin" size={16} />
            Carregando resultados...
          </div>
        ) : (
          <div className="text-sm text-slate-500">
            {request.location} · {request.gl}/{request.hl}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <input name="page" type="hidden" value="1" />
          <Link
            className="inline-flex h-11 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            href="/"
          >
            <RotateCcw aria-hidden="true" size={16} />
            Limpar
          </Link>
          <button
            className="inline-flex h-11 items-center gap-2 rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPending}
            type="submit"
          >
            {isPending && pendingTarget === "search" ? (
              <LoaderCircle aria-hidden="true" className="animate-spin" size={16} />
            ) : (
              <Search aria-hidden="true" size={16} />
            )}
            {isPending && pendingTarget === "search" ? "Buscando..." : "Buscar vagas"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  children,
  htmlFor,
  icon,
  label,
}: {
  children: React.ReactNode;
  htmlFor: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="space-y-2">
      <label
        className="flex items-center gap-1.5 text-sm font-medium text-slate-700"
        htmlFor={htmlFor}
      >
        <span className="text-slate-400">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}
