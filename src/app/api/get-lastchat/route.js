export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    //INFO: Get the last chat for the user from the database
    const lastChat = await db
      .select()
      .from(chats)
      .where(eq(chats.userId, userId))
      .orderBy(desc(chats.createdAt))
      .limit(1);

    //INFO: Check if the chat exists
    if (lastChat.length === 0) {
      return NextResponse.json({ message: "No chat found" }, { status: 404 });
    }

    return NextResponse.json(lastChat);
  } catch (error) {
    console.log("Error in get-lastchat route", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
