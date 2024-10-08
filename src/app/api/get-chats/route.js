export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const _chats = await db
      .select()
      .from(chats)
      .where(eq(chats.userId, userId));
    return NextResponse.json(_chats);
  } catch (error) {
    console.log("Error in get-chats route", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
