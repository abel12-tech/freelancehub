"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto py-16 text-center">
      <div className="empty-state">
        <p className="empty-state-title text-[var(--danger)]">
          Failed to load freelancers
        </p>

        <p className="text-muted text-sm mt-2">
          {error.message}
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => reset()}
            className="btn btn-primary"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
