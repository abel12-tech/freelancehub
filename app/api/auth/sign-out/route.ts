import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    // IMPORTANT: properly invalidate session
    await auth.api.signOut({
      headers: req.headers,
    })

    const res = NextResponse.json({ success: true })

    // force delete cookie (important fallback)
    res.cookies.set("session", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    })

    return res
  } catch (err) {
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    )
  }
}