/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"
import { useRouter } from "next/navigation"
import EditJobForm from "@/components/EditJobForm"
import { authClient } from "@/lib/auth-client"

export default function EditJobClientWrapper({ jobId }: { jobId: string }) {
  const router = useRouter()
  const [job, setJob] = React.useState<any>(null)
  const [session, setSession] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let mounted = true
    async function load() {
      try {
        // Fetch session
        const sessionResult = await authClient.getSession()
        const sessionData = sessionResult.data
        if (mounted) setSession(sessionData)

        // Fetch job
        const res = await fetch(`/api/jobs/${jobId}`, { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to fetch")
        const j = await res.json()
        if (mounted) setJob(j)

        // Check ownership
        if (sessionData?.user?.id !== j.clientId) {
          alert("You don't have permission to edit this job")
          router.push(`/jobs/${jobId}`)
        }
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [jobId, router])

  if (loading) return <p>Loading...</p>
  if (!job) return <p className="text-red-500">Job not found</p>
  if (!session?.user || session.user.id !== job.clientId) {
    return <p className="text-red-500">You don't have permission to edit this job</p>
  }

  return <EditJobForm jobId={jobId} initialValues={{ title: job.title, description: job.description, budget: job.budget }} />
}
