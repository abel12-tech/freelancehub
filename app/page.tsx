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
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <div className="hero">
          <p className="eyebrow mb-2">Job Marketplace</p>
          <h1 className="page-title text-3xl sm:text-4xl">
            Find talented freelancers
          </h1>
          <p className="page-subtitle">
            Browse the latest projects from real clients and make your next career move.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-sm">
            <div className="stat-card">
              <p className="stat-label">Open positions</p>
              <p className="stat-value">{jobs.length}</p>
            </div>
          </div>
        </div>

        <section>
          <h2 className="section-title">Featured Jobs</h2>
          {featuredJobs.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-title">No jobs available</p>
              <p className="text-muted text-sm">Check back soon for new listings.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {featuredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={String(job.id)}
                  title={job.title}
                  company={job.client?.name ?? "Client"}
                  budget={job.budget}
                  applied={appliedJobIds.includes(String(job.id))}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <aside>
        <div className="card p-6 sticky top-20">
          <h2 className="section-title">All Jobs</h2>
          <p className="text-muted text-sm -mt-2 mb-4">
            Latest listings from the marketplace.
          </p>

          <div className="space-y-3 max-h-[70vh] overflow-y-auto">
            {jobs.length === 0 ? (
              <div className="empty-state py-6">
                <p className="empty-state-title">No listings yet</p>
                <p className="text-muted text-sm">Jobs will appear here once posted.</p>
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
