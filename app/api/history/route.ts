// app/api/list-apps/history/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@app/(auth)/auth"
import { db } from "@/lib/db/db"
import { chat } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(req: NextRequest) {
  const session = await auth()

  // Require a real authenticated user
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const chats = await db
      .select()
      .from(chat)
      .where(eq(chat.userId, session.user.id))

    return NextResponse.json(chats)
  } catch (err) {
    console.error("Error fetching history:", err)
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    )
  }
}
