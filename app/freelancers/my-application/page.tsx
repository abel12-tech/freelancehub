"use client"

import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"

interface Application {
  id: string
  status: string
  coverLetter: string
  createdAt: string
  job: {
    id: string
    title: string
    budget: number
  }
}

export default function MyApplicationsPage() {
  const { data: session, isPending } = authClient.useSession()

  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/applications/my", {
          credentials: "include",
        })

        if (!res.ok) throw new Error("Failed to fetch")

        const data = await res.json()
        setApplications(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (session?.user) {
      load()
    }
  }, [session])

  if (isPending || loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="skeleton h-8 w-48 rounded-md" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="card p-5">
            <div className="skeleton h-5 w-2/3 rounded mb-3" />
            <div className="skeleton h-4 w-1/3 rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (session?.user?.role !== "FREELANCER") {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="alert-error">
          Only freelancers can view applications.
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title">My applications</h1>
          <p className="page-subtitle">
            Track all positions you have applied to.
          </p>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-title">No applications yet</p>
          <p className="text-muted text-sm">Browse open jobs and submit your first application.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div key={app.id} className="card p-5">
              <h2 className="text-base font-semibold">
                {app.job.title}
              </h2>

              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="badge badge-budget">
                  {app.job.budget.toLocaleString()} ETB
                </span>
                <span className="badge badge-neutral">
                  {app.status}
                </span>
              </div>

              <p className="text-sm text-muted mt-3">
                Applied {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
