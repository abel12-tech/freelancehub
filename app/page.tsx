import JobCard from "@/components/JobCard";
import { getJobs } from "@/services/jobs.services";
import { getAppliedJobIds } from "@/services/applications.service";
import { getSession } from "@/lib/server/session";

export default async function Home() {
  const jobs = await getJobs();
  const session = await getSession();
  const appliedJobIds = session?.user?.role === "FREELANCER"
    ? await getAppliedJobIds(session.user.id)
    : [];
  const featuredJobs = jobs.slice(0, 3);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="card p-6 mb-6">
          <h1 className="text-3xl font-bold">Find talented freelancers</h1>
          <p className="text-muted mt-2">Browse the latest projects from real clients and make your next career move.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-muted">Open jobs</p>
              <p className="mt-2 text-2xl font-semibold">{jobs.length}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <h2 className="text-2xl font-semibold">Featured Jobs</h2>
          {featuredJobs.length === 0 ? (
            <div className="card p-6 text-muted">No jobs available yet. Check back soon.</div>
          ) : (
            featuredJobs.map((job) => (
              <JobCard
                key={job.id}
                id={String(job.id)}
                title={job.title}
                company={job.client?.name ?? "Client"}
                budget={job.budget}
                applied={appliedJobIds.includes(String(job.id))}
              />
            ))
          )}
        </div>
      </div>

      <aside>
        <div className="card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">All Jobs</h2>
              <p className="text-muted mt-1">Latest listings from the marketplace.</p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {jobs.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-muted">
                No jobs have been posted yet.
              </div>
            ) : (
              jobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={String(job.id)}
                  title={job.title}
                  company={job.client?.name ?? "Client"}
                  budget={job.budget}
                  applied={appliedJobIds.includes(String(job.id))}
                />
              ))
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
