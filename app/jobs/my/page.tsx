"use client"

import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"

interface Job {
  id: string
  title: string
  description: string
  budget: number
  createdAt: string
  applications: {
    id: string
    status: string
  }[]
}

export default function MyJobsPage() {
  const { data: session, isPending } = authClient.useSession()

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/jobs/my", {
          credentials: "include",
        })

        if (!res.ok) throw new Error("Failed to fetch jobs")

        const data = await res.json()
        setJobs(data)
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
    return <div className="p-6">Loading...</div>
  }

  if (session?.user?.role !== "CLIENT") {
    return (
      <div className="p-6 text-red-500">
        Only clients can view their jobs
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        My Jobs
      </h1>

      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="border p-4 rounded">
              <h2 className="font-semibold text-lg">
                {job.title}
              </h2>

              <p className="text-gray-600">
                Budget: ${job.budget}
              </p>

              <p className="text-sm text-gray-500">
                Applications: {job.applications.length}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}