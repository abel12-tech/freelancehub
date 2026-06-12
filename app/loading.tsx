export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="hero">
        <div className="skeleton h-3 w-32 rounded mb-4" />
        <div className="skeleton h-9 w-3/4 rounded mb-3" />
        <div className="skeleton h-5 w-1/2 rounded mb-8" />
        <div className="grid gap-4 sm:grid-cols-2 max-w-sm">
          <div className="stat-card">
            <div className="skeleton h-3 w-20 rounded mb-2" />
            <div className="skeleton h-7 w-10 rounded" />
          </div>
          <div className="stat-card">
            <div className="skeleton h-3 w-20 rounded mb-2" />
            <div className="skeleton h-7 w-10 rounded" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="skeleton h-5 w-36 rounded" />
        {[1, 2, 3].map((item) => (
          <div key={item} className="card p-5">
            <div className="skeleton h-4 w-3/4 rounded mb-2" />
            <div className="skeleton h-3 w-1/2 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
