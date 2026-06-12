"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <nav className="nav-glass">
      <div className="container nav-inner">
        <div className="flex items-center gap-6 min-w-0">
          <Link href="/" className="logo-text shrink-0">
            FreelanceHub
          </Link>
          <p className="hidden lg:block text-sm text-muted truncate">
            Connect with top freelancers
          </p>
        </div>

        <div className="nav-links">
          <Link href="/skills" className="nav-link">
            Skills
          </Link>
          <Link href="/jobs" className="nav-link">
            Jobs
          </Link>
          {user?.role === "CLIENT" && (
            <Link href="/jobs/create" className="nav-link">
              Post a Job
            </Link>
          )}
        </div>

        <div className="shrink-0">
          {isPending ? (
            <div className="h-10 w-24 skeleton rounded-md" />
          ) : user ? (
            <div className="user-pill">
              <span className="user-name">
                {user.name}
                <span className="badge-role">{user.role}</span>
              </span>
              <div className="avatar" title={user.name}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button
                type="button"
                onClick={() => authClient.signOut()}
                className="btn btn-ghost text-xs min-h-9 px-3"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="auth-actions">
              <Link href="/login" className="btn btn-primary">
                Log in
              </Link>
              <Link href="/register" className="btn btn-ghost hidden sm:inline-flex">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
