interface StatCardProps {
  label: string;
  value: string;
  detail?: string;
  tone?: "amber" | "blue" | "green" | "neutral" | "rose";
}

const toneClasses = {
  amber: "border-amber-200 bg-amber-50/80 text-amber-700",
  blue: "border-blue-200 bg-blue-50/80 text-blue-700",
  green: "border-emerald-200 bg-emerald-50/80 text-emerald-700",
  neutral: "border-slate-200 bg-white text-slate-600",
  rose: "border-rose-200 bg-rose-50/80 text-rose-700",
};

export function StatCard({
  label,
  value,
  detail,
  tone = "neutral",
}: StatCardProps) {
  return (
    <article className={`rounded-lg border p-5 shadow-sm ${toneClasses[tone]}`}>
      <p className="text-xs font-medium uppercase text-current">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>
      {detail ? <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p> : null}
    </article>
  );
}
