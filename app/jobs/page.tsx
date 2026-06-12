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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-4xl font-bold">Available Jobs</h1>
        <CreateJobLink />
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs posted yet.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job:any) => (
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