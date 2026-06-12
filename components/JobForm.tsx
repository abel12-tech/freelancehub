"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  createJobSchema,
  type CreateJobFormValues,
} from "@/lib/validation/job.schema"

export type JobFormData = CreateJobFormValues

type JobFormProps = {
  defaultValues?: JobFormData
  onSubmit: (data: JobFormData) => Promise<void>
  buttonText: string
}

export default function JobForm({
  defaultValues,
  onSubmit,
  buttonText,
}: JobFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-6 sm:p-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="title" className="form-label">Job title</label>
          <input
            id="title"
            placeholder="e.g. Senior React Developer"
            className="input"
            {...register("title")}
          />
          {errors.title && (
            <p className="input-error">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            placeholder="Describe the project, requirements, and deliverables"
            className="input h-36 resize-y"
            {...register("description")}
          />
          {errors.description && (
            <p className="input-error">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="budget" className="form-label">Budget (ETB)</label>
          <input
            id="budget"
            type="number"
            placeholder="5000"
            className="input"
            {...register("budget", { valueAsNumber: true })}
          />
          {errors.budget && (
            <p className="input-error">{errors.budget.message}</p>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : buttonText}
        </button>
      </div>
    </form>
  )
}
