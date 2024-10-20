import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/upload-to-s3";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json(); //NOTE: Parse the request body
    const { file_key, file_name } = body;
    if (!file_key || !file_name) {
      return NextResponse.json(
        { message: "Missing file_key or file_name" },
        { status: 400 }
      );
    }

    await loadS3IntoPinecone(file_key); //NOTE: Load the file into Pinecone

    //INFO: Insert the chat record into the database and return the chat_id to the client
    const chat_id = await db
      .insert(chats)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfUrl: getS3Url(file_key),
        userId: userId,
      })
      .returning({
        insertedId: chats.id,
      });

    //INFO: Return the newly created chat
    return NextResponse.json(
      { chat_id: chat_id[0].insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating chat:", error); //NOTE: Log the error
    return NextResponse.json(
      { message: error.message || "An error occurred while creating the chat" },
      { status: 500 }
    );
  }
}
