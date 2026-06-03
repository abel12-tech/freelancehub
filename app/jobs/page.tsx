/* eslint-disable @typescript-eslint/no-explicit-any */
import { getJobs } from "../lib/jobs";
export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">
        Jobs
      </h1>

      <div className="space-y-4">
        {jobs.slice(0, 10).map((job: any) => (
          <div
            key={job.id}
            className="border rounded-lg p-5"
          >
            <h2 className="text-2xl font-semibold">
              {job.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}