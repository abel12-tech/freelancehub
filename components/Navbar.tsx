"use client"

import { authClient } from "@/lib/auth-client"
import Link from "next/link"

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user

  return (
    <nav className="bg-gradient-to-r from-white to-white/60 border-b shadow-sm">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-extrabold text-sky-600">
            FreelanceHub
          </Link>
          <p className="hidden sm:block text-sm text-muted">Connect with top freelancers</p>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <input
            placeholder="Search skills, jobs, companies..."
            className="input search"
          />
          <Link href="/skills" className="text-gray-700 hover:text-sky-600">
            Skills
          </Link>
          <Link href="/jobs" className="text-gray-700 hover:text-sky-600">
            Jobs
          </Link>
          {user?.role === "CLIENT" && (
            <Link href="/jobs/create" className="text-gray-700 hover:text-sky-600">
              Post a Job
            </Link>
          )}
        </div>

        <div>
          {isPending ? null : user ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-800 font-medium">
                {user.name}
                <span className="text-xs text-gray-400 ml-2">({user.role})</span>
              </span>
              <button
                type="button"
                onClick={() => authClient.signOut()}
                className="btn btn-ghost"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="btn btn-primary">
                Log in
              </Link>
              <Link href="/register" className="btn btn-ghost">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}