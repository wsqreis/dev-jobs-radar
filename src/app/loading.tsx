export default function Loading() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#0f172a_0%,_#111827_100%)] px-6 py-12 text-slate-50 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 animate-pulse">
        <div className="h-64 rounded-[2rem] border border-white/10 bg-white/5" />
        <div className="h-48 rounded-3xl border border-white/10 bg-white/5" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-28 rounded-3xl border border-white/10 bg-white/5" />
          <div className="h-28 rounded-3xl border border-white/10 bg-white/5" />
          <div className="h-28 rounded-3xl border border-white/10 bg-white/5" />
        </div>
      </div>
    </main>
  );
}
