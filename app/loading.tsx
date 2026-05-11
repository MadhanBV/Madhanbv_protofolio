export default function Loading() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="section-container flex min-h-screen items-center justify-center">
        <div className="w-full max-w-3xl space-y-5">
          <div className="h-4 w-40 animate-pulse rounded bg-white/10" />
          <div className="h-14 w-full animate-pulse rounded-lg bg-white/10" />
          <div className="h-14 w-3/4 animate-pulse rounded-lg bg-white/10" />
          <div className="grid gap-3 md:grid-cols-3">
            <div className="h-24 animate-pulse rounded-lg bg-white/10" />
            <div className="h-24 animate-pulse rounded-lg bg-white/10" />
            <div className="h-24 animate-pulse rounded-lg bg-white/10" />
          </div>
        </div>
      </div>
    </main>
  );
}

