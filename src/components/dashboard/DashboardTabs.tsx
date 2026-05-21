"use client";

import { useState } from "react";
import { BarChart3, BriefcaseBusiness, Building2, Code2, MapPin } from "lucide-react";
import { DeveloperInspector } from "@/components/developer-inspector/DeveloperInspector";
import { JobsList } from "@/components/jobs/JobsList";
import type { JobsSearchResponse } from "@/lib/jobs/types";

interface DashboardTabsProps {
  response: JobsSearchResponse;
}

export function DashboardTabs({ response }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<"jobs" | "technical">("jobs");

  return (
    <section className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
        <div className="grid gap-2 sm:grid-cols-2">
          <TabButton
            active={activeTab === "jobs"}
            icon={<BriefcaseBusiness aria-hidden="true" size={17} />}
            label="Vagas"
            onClick={() => setActiveTab("jobs")}
          />
          <TabButton
            active={activeTab === "technical"}
            icon={<Code2 aria-hidden="true" size={17} />}
            label="Painel técnico"
            onClick={() => setActiveTab("technical")}
          />
        </div>
      </div>

      {activeTab === "jobs" ? (
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase text-slate-500">Pipeline</p>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                  Vagas encontradas
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
                <BriefcaseBusiness aria-hidden="true" size={16} />
                {response.meta.totalJobs} resultado(s)
              </div>
            </div>
            <JobsList jobs={response.jobs} meta={response.meta} request={response.request} />
          </div>

          <aside className="space-y-4">
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase text-slate-500">Sinais</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-950">
                    Resumo de mercado
                  </h2>
                </div>
                <BarChart3 aria-hidden="true" className="text-rose-500" size={24} />
              </div>
              <div className="mt-5 space-y-5">
                <InsightList
                  icon={<Building2 aria-hidden="true" size={16} />}
                  items={response.insights.topCompanies}
                  title="Empresas"
                />
                <InsightList
                  icon={<MapPin aria-hidden="true" size={16} />}
                  items={response.insights.topLocations}
                  title="Locais"
                />
                <InsightList
                  icon={<BriefcaseBusiness aria-hidden="true" size={16} />}
                  items={response.insights.topSchedules}
                  title="Formatos"
                />
              </div>
            </section>
          </aside>
        </section>
      ) : (
        <DeveloperInspector response={response} />
      )}
    </section>
  );
}

function TabButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={active}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition ${
        active
          ? "bg-slate-950 text-white shadow-sm"
          : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-950"
      }`}
      onClick={onClick}
      type="button"
    >
      {icon}
      {label}
    </button>
  );
}

function InsightList({
  icon,
  items,
  title,
}: {
  icon: React.ReactNode;
  items: Array<{ name: string; count: number }>;
  title: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
        <span className="text-slate-400">{icon}</span>
        {title}
      </div>
      <div className="space-y-2">
        {items.length > 0 ? (
          items.slice(0, 4).map((item) => (
            <div
              className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2"
              key={item.name}
            >
              <span className="truncate text-sm text-slate-700">{item.name}</span>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-600">
                {item.count}
              </span>
            </div>
          ))
        ) : (
          <p className="rounded-md border border-dashed border-slate-200 px-3 py-2 text-sm text-slate-500">
            Sem dados
          </p>
        )}
      </div>
    </div>
  );
}
