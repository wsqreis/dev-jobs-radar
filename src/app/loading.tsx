export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="h-16 animate-pulse rounded-lg bg-white shadow-sm" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-32 animate-pulse rounded-lg bg-white shadow-sm" />
          <div className="h-32 animate-pulse rounded-lg bg-white shadow-sm" />
          <div className="h-32 animate-pulse rounded-lg bg-white shadow-sm" />
        </div>
        <div className="h-64 animate-pulse rounded-lg bg-white shadow-sm" />
      </div>
    </main>
  );
}
