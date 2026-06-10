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
    return <div className="p-6">Loading...</div>
  }

  if (session?.user?.role !== "FREELANCER") {
    return (
      <div className="p-6 text-red-500">
        Only freelancers can view applications
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="border p-4 rounded">
              <h2 className="font-semibold">
                {app.job.title}
              </h2>

              <p>Budget: ${app.job.budget}</p>
              <p>Status: {app.status}</p>

              <p className="text-sm text-gray-500">
                {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}