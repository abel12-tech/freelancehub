"use client"
import React from "react"
import { useRouter } from "next/navigation"
import JobForm from "./JobForm"
import { type UpdateJobFormValues } from "@/lib/validation/job.schema"

type Props = {
  jobId: string
  initialValues: Partial<UpdateJobFormValues>
}

export default function EditJobForm({ jobId, initialValues }: Props) {
  const router = useRouter()

  async function onSubmit(data: UpdateJobFormValues) {
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        alert(json?.error ?? "Failed to update job")
        return
      }

      router.push(`/jobs/${jobId}`)
    } catch (err) {
      console.error(err)
      alert("Failed to update job")
    }
  }

  return <JobForm defaultValues={initialValues} onSubmit={onSubmit} submitLabel="Update Job" />
}
