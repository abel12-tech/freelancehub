export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        Loading freelancers...
      </h1>

      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="border rounded-lg p-5 animate-pulse"
          >
            <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/4 bg-gray-200 mt-3 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 mt-2 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}