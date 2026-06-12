"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { formatApiError } from "@/lib/format-api-error"
import {
  applyJobSchema,
  type ApplyJobFormValues,
} from "@/lib/validation/application.schema"

type ApplyJobFormProps = {
  jobId: string
}

export default function ApplyJobForm({ jobId }: ApplyJobFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplyJobFormValues>({
    resolver: zodResolver(applyJobSchema),
    defaultValues: { coverLetter: "" },
  })

  async function onSubmit(data: ApplyJobFormValues) {
    const response = await fetch(`/api/jobs/${jobId}/apply`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const body = await response.json()
      alert(formatApiError(body.error))
      return
    }

    router.refresh()
    alert("Application submitted successfully")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <div className="card form-section">
        <h2 className="text-2xl font-semibold">Apply for this job</h2>

        <div className="mt-4">
          <textarea
            placeholder="Write your cover letter..."
            className="w-full input h-40"
            {...register("coverLetter")}
          />
          {errors.coverLetter && (
            <p className="text-red-500 text-sm mt-1">{errors.coverLetter.message}</p>
          )}
        </div>

        <div className="mt-5 flex items-center justify-end">
          <button type="submit" disabled={isSubmitting} className="btn btn-primary disabled:opacity-50">
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </form>
  )
}