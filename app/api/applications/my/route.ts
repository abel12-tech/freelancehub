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

    const applications = await prisma.application.findMany({
      where: {
        freelancerId: session.user.id,
      },
      include: {
        job: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    )
  }
}