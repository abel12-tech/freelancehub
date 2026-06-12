"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import JobForm, { JobFormData } from "@/components/JobForm"
import { authClient } from "@/lib/auth-client"
import { formatApiError } from "@/lib/format-api-error"

export default function CreateJobPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (isPending) {
      return
    }

    if (!session?.user) {
      router.push("/login")
      return
    }

    if (session.user.role !== "CLIENT") {
      router.push("/jobs")
    }
  }, [isPending, session, router])

  async function createJob(data: JobFormData) {
    const response = await fetch("/api/jobs", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const body = await response.json()
      alert(formatApiError(body.error))
      return
    }

    router.push("/jobs")
  }

  if (isPending || !session?.user || session.user.role !== "CLIENT") {
    return (
      <div className="max-w-3xl mx-auto py-20">
        <div className="skeleton h-8 w-48 rounded-md mb-4" />
        <div className="skeleton h-64 w-full rounded-lg" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title">Post a job</h1>
          <p className="page-subtitle">
            Create a new listing and connect with qualified freelancers.
          </p>
        </div>
      </div>

      <JobForm buttonText="Publish job" onSubmit={createJob} />
    </div>
  )
}
