import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { SearchForm } from "@/components/filters/SearchForm";
import { StatCard } from "@/components/shared/StatCard";
import { resolveJobSearchRequest } from "@/lib/jobs/presets";
import { searchJobs } from "@/lib/jobs/searchJobs";
import {
  Activity,
  DatabaseZap,
  Globe2,
  MapPin,
  RadioTower,
} from "lucide-react";

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function toSearchParamsRecord(
  searchParams: Record<string, string | string[] | undefined>,
) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") {
      params.set(key, value);
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, item);
      }
    }
  }

  return params;
}

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const request = resolveJobSearchRequest(toSearchParamsRecord(resolvedSearchParams));
  const response = await searchJobs(request);
  const activeMode = response.meta.resolvedMode === "demo" ? "Demo" : "Live";
  const topCompany = response.insights.topCompanies[0];
  const topLocation = response.insights.topLocations[0];
  const topSchedule = response.insights.topSchedules[0];

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <header className="border-b border-slate-200 bg-white/95">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-slate-950 text-white">
              <RadioTower aria-hidden="true" size={22} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Dev Jobs Radar</p>
              <p className="text-xs text-slate-500">Google Jobs intelligence</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700">
              <Activity aria-hidden="true" size={14} />
              {activeMode}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-600">
              <Globe2 aria-hidden="true" size={14} />
              {response.request.gl.toUpperCase()} / {response.request.hl}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-600">
              <MapPin aria-hidden="true" size={14} />
              {response.request.location}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
              <DatabaseZap aria-hidden="true" size={14} />
              {response.meta.source === "fixture" ? "Demo dataset" : "SerpApi live feed"}
            </div>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Dev Jobs Radar
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                Painel de vagas para backend, dados, IA e trabalho remoto no Brasil e em Portugal.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <p className="text-xs font-medium uppercase text-slate-500">Busca atual</p>
              <p className="mt-1 line-clamp-2 text-lg font-semibold text-slate-950">
                {response.request.query}
              </p>
            </div>
            <div className="grid grid-cols-3 divide-x divide-slate-200 text-center">
              <div className="px-3 py-4">
                <p className="text-2xl font-semibold">{response.meta.totalJobs}</p>
                <p className="text-xs text-slate-500">vagas</p>
              </div>
              <div className="px-3 py-4">
                <p className="text-2xl font-semibold">{response.meta.pageIndex}</p>
                <p className="text-xs text-slate-500">página</p>
              </div>
              <div className="px-3 py-4">
                <p className="text-2xl font-semibold">{response.meta.pageSize}</p>
                <p className="text-xs text-slate-500">lote</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard
            detail={topCompany ? `${topCompany.count} vaga(s)` : undefined}
            label="Empresa em destaque"
            tone="blue"
            value={topCompany?.name ?? "Sem dados"}
          />
          <StatCard
            detail={topLocation ? `${topLocation.count} vaga(s)` : undefined}
            label="Local mais frequente"
            tone="green"
            value={topLocation?.name ?? "Sem dados"}
          />
          <StatCard
            detail={topSchedule ? `${topSchedule.count} vaga(s)` : undefined}
            label="Formato comum"
            tone="amber"
            value={topSchedule?.name ?? "Sem dados"}
          />
        </section>

        <SearchForm request={response.request} />

        {response.meta.warning ? (
          <section className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800 shadow-sm">
            {response.meta.warning}
          </section>
        ) : null}

        <DashboardTabs response={response} />
      </div>
    </main>
  );
}
