"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

type JobCardProps = {
  id: string | number;
  title: string;
  budget: number;
  company: string;
  applied?: boolean;
  className?: string;
  featured?: boolean;
};

export default function JobCard({
  id,
  title,
  company,
  budget,
  applied = false,
}: JobCardProps) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isClient = user?.role === "CLIENT";
  const isFreelancer = user?.role === "FREELANCER";
  const jobUrl = `/jobs/${id}`;
  const applyUrl = user ? jobUrl : `/login?next=${encodeURIComponent(jobUrl)}`;

  return (
    <article className="card card-hover p-5">
      <div className="job-card-inner">
        <div className="job-card-content">
          <h3 className="text-base font-semibold tracking-tight text-[var(--foreground)] truncate">
            {title}
          </h3>
          <p className="text-sm text-muted mt-0.5">{company}</p>
        </div>

        <div className="job-card-aside">
          <span className="badge badge-budget">
            {budget.toLocaleString()} ETB
          </span>
          <Link href={jobUrl} className="link-accent">
            View details
          </Link>
        </div>
      </div>

      {!isClient && (
        <div className="card-footer">
          {isFreelancer && applied ? (
            <span className="badge badge-applied">Application submitted</span>
          ) : (
            <Link href={applyUrl} className="btn btn-primary">
              Apply Now
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
