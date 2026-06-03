"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="max-w-5xl mx-auto py-20 text-center">
      <h1 className="text-3xl font-bold text-red-500">
        Failed to load freelancers
      </h1>

      <p className="mt-3 text-gray-600">
        {error.message}
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 px-5 py-2 bg-black text-white rounded-lg"
      >
        Try Again
      </button>
    </div>
  );
}