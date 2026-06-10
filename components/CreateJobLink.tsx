"use client"

import React from "react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

export default function CreateJobLink() {
  const [session, setSession] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function loadSession() {
      try {
        const data = await authClient.getSession()
        setSession(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadSession()

    const handler = () => {
      loadSession()
    }
    window?.addEventListener("better-auth:session-updated", handler)
    return () => window?.removeEventListener("better-auth:session-updated", handler)
  }, [])

  if (loading) return null
  if (!session?.user || session.user.role !== "CLIENT") return null

  return (
    <Link href="/jobs/create" className="bg-blue-600 text-white px-4 py-2 rounded">
      Create Job
    </Link>
  )
}
