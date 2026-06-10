"use client"

import { authClient } from "@/lib/auth-client"
import Link from "next/link"

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              FreelanceHub
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/skills" className="text-gray-700 hover:text-blue-600">
              Skills
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {user?.role === "CLIENT" && (
              <Link href="/jobs/create" className="text-gray-700 hover:text-blue-600">
                Post a Job
              </Link>
            )}

            <Link href="/jobs" className="text-gray-700 hover:text-blue-600">
              Jobs
            </Link>
          </div>

          {isPending ? null : user ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-800 font-medium">
                {user.name}
                <span className="text-xs text-gray-400 ml-2">
                  ({user.role})
                </span>
              </span>
              <button
                type="button"
                onClick={() => authClient.signOut()}
                className="text-gray-600 hover:text-blue-600 text-sm"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link     
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}