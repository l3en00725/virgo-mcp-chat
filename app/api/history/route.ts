// app/api/history/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@app/(auth)/auth"   // adjust import if needed
import { db } from "@/lib/db/db"
import { chat } from "@/lib/db/schema"

export async function GET(req: NextRequest) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    const chats = await db
      .select()
      .from(chat)
      .where(chat.userId.eq(session.user.id))

    return NextResponse.json(chats)
  } catch (err) {
    console.error("Error fetching history:", err)
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    )
  }
}
