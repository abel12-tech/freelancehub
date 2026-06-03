"use client"

import { useRouter } from "next/navigation"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"

import { registerSchema } from "@/lib/validation/auth.schema"

type RegisterFormData = z.infer<
  typeof registerSchema
>

export default function RegisterPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "FREELANCER",
    },
  })

  async function onSubmit(
    data: RegisterFormData
  ) {
    try {
      console.log(data)

      // TODO:
      // Send data to Better Auth API

      router.push("/login")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-10 bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-5 bg-white p-8 rounded-2xl shadow"
      >
        <div>
          <h1 className="text-4xl font-bold">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join FreelanceHub today
          </p>
        </div>

        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-4 rounded-xl"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-4 rounded-xl"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-4 rounded-xl"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <select
            className="w-full border p-4 rounded-xl"
            {...register("role")}
          >
            <option value="FREELANCER">
              Freelancer
            </option>

            <option value="CLIENT">
              Client
            </option>
          </select>

          {errors.role && (
            <p className="text-red-500 text-sm mt-1">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-4 rounded-xl disabled:opacity-50"
        >
          {isSubmitting
            ? "Creating Account..."
            : "Register"}
        </button>
      </form>
    </div>
  )
}