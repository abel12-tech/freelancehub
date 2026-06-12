"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { authClient } from "@/lib/auth-client"
import { registerSchema ,type RegisterFormValues } from "@/lib/validation/auth"

export default function RegisterPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "FREELANCER",
    },
  })

  async function onSubmit(data: RegisterFormValues) {
    try {
      const result = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
      })

      console.log("Registration result:", result)

      if (result.data) {
        router.push("/login")
      } else {
        alert(result.error?.message ?? "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      alert("Something went wrong")
    }
  }

  return (
    <div className="form-page">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-card space-y-5"
      >
        <div className="form-header">
          <h1 className="page-title text-2xl">Create account</h1>
          <p className="page-subtitle mx-auto">Join FreelanceHub today</p>
        </div>

        <div>
          <label htmlFor="name" className="form-label">Full name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="input"
            {...register("name")}
          />
          {errors.name && (
            <p className="input-error">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="input"
            {...register("email")}
          />
          {errors.email && (
            <p className="input-error">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Minimum 8 characters"
            className="input"
            {...register("password")}
          />
          {errors.password && (
            <p className="input-error">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="role" className="form-label">Account type</label>
          <select
            id="role"
            className="input"
            {...register("role")}
          >
            <option value="FREELANCER">Freelancer — I want to find work</option>
            <option value="CLIENT">Client — I want to hire talent</option>
          </select>
          {errors.role && (
            <p className="input-error">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full disabled:opacity-50"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>

        <p className="text-center text-muted text-sm pt-1">
          Already have an account?{" "}
          <Link href="/login" className="link-accent">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}
