export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="skeleton h-8 w-56 rounded-md" />

      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center gap-3">
              <div className="skeleton w-9 h-9 rounded-full" />
              <div className="flex-1">
                <div className="skeleton h-4 w-1/3 rounded mb-2" />
                <div className="skeleton h-3 w-1/4 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
