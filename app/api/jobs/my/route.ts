/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    })

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Only CLIENT can access "my jobs"
    if (session.user.role !== "CLIENT") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    const jobs = await prisma.job.findMany({
      where: {
        clientId: session.user.id,
      },
      include: {
        applications: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    )
  }
}