import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { convertToASCII, getPineconeClient } from "@/lib/pinecone";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { chatId, fileKey } = await req.json();

    // NOTE: Ensure that both chatId and fileKey are present
    if (!chatId || !fileKey) {
      return NextResponse.json(
        { message: "Missing chatId or fileKey" },
        { status: 400 }
      );
    }

    const s3 = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
      },
    });
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: fileKey,
    };
    // INFO: Delete file from S3
    const deleteCommand = new DeleteObjectCommand(params);
    await s3.send(deleteCommand);

    // INFO: Delete chat from database
    await db.delete(chats).where(eq(chats.id, chatId));

    // INFO: Delete pinecone namespace
    const client = await getPineconeClient();
    const pineconeIndex = client.index("insight-pdf");
    const namespace = pineconeIndex.namespace(convertToASCII(fileKey));
    await namespace.deleteAll();

    return NextResponse.json({ message: "Chat deleted" });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return NextResponse.json(
      { message: "Error deleting chat" },
      { status: 500 }
    );
  }
}
