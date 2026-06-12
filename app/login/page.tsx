"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { authClient } from "@/lib/auth-client"
import { loginSchema, type LoginFormValues } from "@/lib/validation/auth"

export default function LoginPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormValues) {
    try {
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      })

      if (result.data) {
        router.refresh()

        const role = result.data.user.role

        if (role === "CLIENT") {
          router.push("/jobs/create")
        } else {
          router.push("/jobs")
        }
      } else {
        alert(result.error?.message ?? "Invalid credentials")
      }
    } catch (error) {
      console.error("Login error:", error)
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
          <h1 className="page-title text-2xl">Welcome back</h1>
          <p className="page-subtitle mx-auto">
            Sign in to your FreelanceHub account
          </p>
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
            placeholder="Enter your password"
            className="input"
            {...register("password")}
          />
          {errors.password && (
            <p className="input-error">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-center text-muted text-sm pt-1">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="link-accent">
            Create account
          </Link>
        </p>
      </form>
    </div>
  )
}
