import Link from "next/link"
import { notFound } from "next/navigation"

import ApplyJobForm from "@/components/ApplyJobForm"
import JobOwnerActions from "@/components/JobOwnerActions"
import { getSession } from "@/lib/server/session"
import {
  getApplicationsByJobId,
  hasApplied,
} from "@/services/applications.service"
import { getJobById } from "@/services/jobs.services"

export default async function JobPage({
  params,
}: {
  params: Promise<{ jobId: string }>
}) {
  const { jobId } = await params
  const job = await getJobById(jobId)

  if (!job) {
    notFound()
  }

  const session = await getSession()
  const user = session?.user
  const isOwner = user?.id === job.clientId
  const isFreelancer = user?.role === "FREELANCER"
  const isClient = user?.role === "CLIENT"

  let applications = null
  let alreadyApplied = false

  if (isOwner) {
    applications = await getApplicationsByJobId(jobId)
  }

  if (isFreelancer && user) {
    alreadyApplied = await hasApplied(jobId, user.id)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card job-detail-card">
        <p className="eyebrow mb-2">Job posting</p>
        <h1 className="page-title text-2xl sm:text-3xl">{job.title}</h1>

        <div className="job-meta">
          <span className="badge badge-budget">
            {job.budget.toLocaleString()} ETB
          </span>
          <span className="badge badge-neutral">
            {job.client.name}
          </span>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--card-border)]">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-3">
            Description
          </h2>
          <p className="text-[0.9375rem] leading-relaxed whitespace-pre-wrap">
            {job.description}
          </p>
        </div>

        {isOwner && <JobOwnerActions jobId={job.id} />}
      </div>

      {!user && (
        <div className="alert-info mt-6">
          <Link href="/login" className="link-accent">
            Sign in
          </Link>{" "}
          to apply for this position.
        </div>
      )}

      {isFreelancer && !alreadyApplied && <ApplyJobForm jobId={job.id} />}

      {isFreelancer && alreadyApplied && (
        <div className="alert-success mt-6">
          You have already submitted an application for this job.
        </div>
      )}

      {isClient && !isOwner && (
        <div className="alert-warning mt-6">
          Only freelancers can apply to job postings.
        </div>
      )}

      {isOwner && applications && (
        <section className="mt-10">
          <h2 className="section-title">
            Applications ({applications.length})
          </h2>

          {applications.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-title">No applications received</p>
              <p className="text-muted text-sm">Applicants will appear here once they apply.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((application) => (
                <div key={application.id} className="application-card">
                  <div className="application-header">
                    <div className="avatar">
                      {application.freelancer.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">
                        {application.freelancer.name}
                      </p>
                      <p className="text-sm text-muted">
                        {application.freelancer.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--foreground)]">
                    {application.coverLetter}
                  </p>
                  <p className="text-xs text-muted mt-3">
                    Submitted {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
