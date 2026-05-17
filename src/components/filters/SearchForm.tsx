import Link from "next/link";
import { jobSearchPresets } from "@/lib/jobs/presets";
import type { JobSearchRequest } from "@/lib/jobs/types";

interface SearchFormProps {
  request: JobSearchRequest;
}

export function SearchForm({ request }: SearchFormProps) {
  return (
    <form className="grid gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6" method="GET">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-200" htmlFor="q">
          Busca principal
        </label>
        <input
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
          defaultValue={request.query}
          id="q"
          name="q"
          placeholder="desenvolvedor backend remoto"
          type="text"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="location">
            Localização
          </label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
            defaultValue={request.location}
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
            defaultValue={request.gl}
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
            defaultValue={request.hl}
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
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
            defaultValue={request.mode}
            id="mode"
            name="mode"
          >
            <option value="auto">Auto</option>
            <option value="demo">Demo</option>
            <option value="live">Live</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-200">Presets</p>
        <div className="flex flex-wrap gap-3">
          {jobSearchPresets.map((preset) => (
            <button
              key={preset.id}
              className={`rounded-full border px-4 py-2 text-sm transition ${request.preset === preset.id ? "border-sky-400 bg-sky-400/15 text-sky-100" : "border-white/10 bg-white/5 text-slate-300 hover:border-slate-400 hover:text-white"}`}
              name="preset"
              type="submit"
              value={preset.id}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input name="num" type="hidden" value={String(request.num)} />
        <button
          className="rounded-full bg-sky-500 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
          type="submit"
        >
          Buscar vagas
        </button>
        <Link
          className="rounded-full border border-white/10 px-5 py-3 text-sm text-slate-300 transition hover:border-slate-400 hover:text-white"
          href="/"
        >
          Limpar filtros
        </Link>
      </div>
    </form>
  );
}
