import { notFound, redirect } from "next/navigation"

import EditJobForm from "@/components/EditJobForm"
import { getSession } from "@/lib/server/session"
import { getJobById } from "@/services/jobs.services"

export default async function EditPage({
  params,
}: {
  params: Promise<{ jobId: string }>
}) {
  const { jobId } = await params
  const session = await getSession()
  const job = await getJobById(jobId)

  if (!job) {
    notFound()
  }

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.id !== job.clientId) {
    redirect(`/jobs/${jobId}`)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit job</h1>
          <p className="page-subtitle">
            Update your job listing details below.
          </p>
        </div>
      </div>

      <EditJobForm
        jobId={jobId}
        job={{
          title: job.title,
          description: job.description,
          budget: job.budget,
        }}
      />
    </div>
  )
}
