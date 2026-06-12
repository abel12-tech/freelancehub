"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type JobOwnerActionsProps = {
  jobId: string
}

export default function JobOwnerActions({ jobId }: JobOwnerActionsProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this job?")

    if (!confirmed) {
      return
    }

    setDeleting(true)

    const response = await fetch(`/api/jobs/${jobId}`, {
      method: "DELETE",
      credentials: "include",
    })

    setDeleting(false)

    if (!response.ok) {
      const body = await response.json()
      alert(body.error ?? "Failed to delete job")
      return
    }

    router.push("/jobs")
    router.refresh()
  }

  return (
    <div className="actions-row mt-8 pt-6 border-t border-[var(--card-border)]">
      <Link
        href={`/jobs/${jobId}/edit`}
        className="btn btn-warning"
      >
        Edit job
      </Link>

      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="btn btn-danger disabled:opacity-50"
      >
        {deleting ? "Deleting..." : "Delete job"}
      </button>
    </div>
  )
}
