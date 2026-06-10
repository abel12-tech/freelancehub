import React from "react"
import EditJobClientWrapper from "./client"

export default async function EditJobPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <EditJobClientWrapper jobId={jobId} />
    </div>
  )
}
