import { DeveloperInspector } from "@/components/developer-inspector/DeveloperInspector";
import { JobsList } from "@/components/jobs/JobsList";
import { SearchForm } from "@/components/filters/SearchForm";
import { StatCard } from "@/components/shared/StatCard";
import { resolveJobSearchRequest } from "@/lib/jobs/presets";
import { searchJobs } from "@/lib/jobs/searchJobs";

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

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%),linear-gradient(180deg,_#0f172a_0%,_#111827_100%)] px-6 py-12 text-slate-50 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur xl:grid-cols-[1.15fr_0.85fr] xl:p-10">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-sm text-sky-200">
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1">
                Radar de mercado
              </span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1">
                Google Jobs
              </span>
              <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1">
                PT-BR first
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-200">
                Dev Jobs Radar
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Descubra vagas de tecnologia com foco em Brasil, Portugal e trabalho remoto.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                Explore sinais do mercado em buscas de backend, dados, IA e trabalho remoto com filtros pensados para Brasil, Portugal e oportunidades distribuídas.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <StatCard
              label="Modo ativo"
              value={response.meta.resolvedMode === "demo" ? "Demo" : "Live"}
              detail={response.meta.source === "fixture" ? "Usando fixture pública para avaliação rápida." : "Consultando a API em tempo real."}
            />
            <StatCard
              label="Resultados"
              value={String(response.meta.totalJobs)}
              detail={`Página ${response.meta.pageIndex} · busca atual: ${response.request.query}`}
            />
            <StatCard
              label="Local base"
              value={response.request.location}
              detail={`gl=${response.request.gl} · hl=${response.request.hl}`}
            />
          </div>
        </section>

        <SearchForm request={response.request} />

        {response.meta.warning ? (
          <section className="rounded-3xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-sm text-amber-100">
            {response.meta.warning}
          </section>
        ) : null}

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="Empresa em destaque"
            value={response.insights.topCompanies[0]?.name ?? "Sem dados"}
            detail={response.insights.topCompanies[0] ? `${response.insights.topCompanies[0].count} vaga(s)` : undefined}
          />
          <StatCard
            label="Local mais frequente"
            value={response.insights.topLocations[0]?.name ?? "Sem dados"}
            detail={response.insights.topLocations[0] ? `${response.insights.topLocations[0].count} vaga(s)` : undefined}
          />
          <StatCard
            label="Formato comum"
            value={response.insights.topSchedules[0]?.name ?? "Sem dados"}
            detail={response.insights.topSchedules[0] ? `${response.insights.topSchedules[0].count} vaga(s)` : undefined}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Vagas encontradas</h2>
                <p className="text-sm text-slate-400">
                  Resultados normalizados para uso em UI e CLI.
                </p>
              </div>
            </div>
            <JobsList jobs={response.jobs} meta={response.meta} request={response.request} />
          </div>

          <aside className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-white">Resumo técnico</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
              <p>
                Esta página lê os filtros diretamente da URL, resolve o modo demo ou live no servidor e usa a mesma camada compartilhada que abastece a rota <strong>/api/jobs</strong>.
              </p>
              <p>
                O CLI reaproveita exatamente a mesma função de busca e o mesmo processo de normalização, o que facilita transformar esta demo em conteúdo técnico ou automações simples.
              </p>
              <p>
                O painel técnico deixa visível o caminho completo entre a query da pessoa usuária, a chamada de busca e a resposta resumida que vai para a interface.
              </p>
            </div>
          </aside>
        </section>

        <DeveloperInspector response={response} />
      </div>
    </main>
  );
}
