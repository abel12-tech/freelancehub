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
        <h2 className="section-title border-0 pb-0 mb-1">Submit application</h2>
        <p className="text-muted text-sm mb-5">
          Provide a cover letter explaining your qualifications for this role.
        </p>

        <div>
          <label htmlFor="coverLetter" className="form-label">Cover letter</label>
          <textarea
            id="coverLetter"
            placeholder="Describe your relevant experience and interest in this position"
            className="input h-36 resize-y"
            {...register("coverLetter")}
          />
          {errors.coverLetter && (
            <p className="input-error">{errors.coverLetter.message}</p>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting} className="btn btn-primary disabled:opacity-50">
            {isSubmitting ? "Submitting..." : "Submit application"}
          </button>
        </div>
      </div>
    </form>
  )
}
