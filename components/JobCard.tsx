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
    <article className="card p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-muted">{company}</p>
        </div>

        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
          <div className="inline-flex items-center whitespace-nowrap rounded-full bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1 min-w-22">
            {budget} ETB
          </div>
          <Link href={jobUrl} className="text-sky-600 hover:underline text-sm">
            View
          </Link>
        </div>
      </div>

      {!isClient && (
        <div className="mt-5 flex justify-end">
          {isFreelancer && applied ? (
            <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-4 py-2 text-sm font-semibold">
              You have applied
            </span>
          ) : (
            <Link href={applyUrl} className="btn btn-primary px-5 py-3 text-sm font-semibold">
              Apply Now
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
