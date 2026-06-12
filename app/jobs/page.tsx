/* eslint-disable @typescript-eslint/no-explicit-any */
import JobCard from "@/components/JobCard"
import CreateJobLink from "@/components/CreateJobLink"
import { getJobs } from "@/services/jobs.services"
import { getSession } from "@/lib/server/session"
import { getAppliedJobIds } from "@/services/applications.service"

export default async function JobsPage() {
  const jobs = await getJobs()
  const session = await getSession()
  const appliedJobIds = session?.user?.role === "FREELANCER"
    ? await getAppliedJobIds(session.user.id)
    : []

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Available Jobs</h1>
          <p className="page-subtitle">
            {jobs.length > 0
              ? `${jobs.length} open position${jobs.length === 1 ? "" : "s"} on the platform`
              : "New opportunities are added regularly"}
          </p>
        </div>
        <div className="page-header-actions">
          <CreateJobLink />
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-title">No jobs posted yet</p>
          <p className="text-muted text-sm">Be the first to post a job or check back later.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job: any) => (
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
    </div>
  )
}
