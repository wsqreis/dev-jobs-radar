import type { JobsSearchResponse } from "@/lib/jobs/types";

interface DeveloperInspectorProps {
  response: JobsSearchResponse;
}

function formatJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function DeveloperInspector({ response }: DeveloperInspectorProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-200">
          Developer Inspector
        </p>
        <h2 className="text-2xl font-semibold text-white">
          Como esta busca foi construída com SerpApi
        </h2>
        <p className="text-sm leading-7 text-slate-300">
          Este painel mostra a request normalizada, o resumo cru retornado pela integração e exemplos prontos para documentação, demo técnica ou conteúdo educativo.
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-slate-400">
              Request normalizada
            </p>
            <pre className="overflow-x-auto text-xs leading-6 text-slate-200">
              {formatJson(response.request)}
            </pre>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-slate-400">
              Resumo cru da busca
            </p>
            <pre className="overflow-x-auto text-xs leading-6 text-slate-200">
              {formatJson(response.raw)}
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-slate-400">
              Exemplo com SDK
            </p>
            <pre className="overflow-x-auto text-xs leading-6 text-slate-200">
              {response.examples.sdk}
            </pre>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-slate-400">
              Exemplo com CLI
            </p>
            <pre className="overflow-x-auto text-xs leading-6 text-slate-200">
              {response.examples.cli}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
