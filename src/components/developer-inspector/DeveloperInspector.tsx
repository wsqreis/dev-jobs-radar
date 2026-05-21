import type { JobsSearchResponse } from "@/lib/jobs/types";
import { Code2, FileJson2, TerminalSquare } from "lucide-react";

interface DeveloperInspectorProps {
  response: JobsSearchResponse;
}

function formatJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function DeveloperInspector({ response }: DeveloperInspectorProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase text-slate-500">Painel técnico</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
            Payload da busca
          </h2>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-600">
          /api/jobs
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <CodeBlock
          icon={<FileJson2 aria-hidden="true" size={16} />}
          label="Request normalizada"
          value={formatJson(response.request)}
        />
        <CodeBlock
          icon={<FileJson2 aria-hidden="true" size={16} />}
          label="Resumo bruto"
          value={formatJson(response.raw)}
        />
        <CodeBlock
          icon={<Code2 aria-hidden="true" size={16} />}
          label="SDK JavaScript"
          value={response.examples.sdk}
        />
        <CodeBlock
          icon={<TerminalSquare aria-hidden="true" size={16} />}
          label="CLI"
          value={response.examples.cli}
        />
      </div>
    </section>
  );
}

function CodeBlock({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs font-medium uppercase text-slate-300">
        {icon}
        {label}
      </div>
      <pre className="max-h-80 overflow-auto p-4 font-mono text-xs leading-6 text-slate-100">
        {value}
      </pre>
    </div>
  );
}
