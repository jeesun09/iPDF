import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats, messages as _messages } from "@/lib/db/schema";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: "strict",
  organization: process.env.OPENAI_ORGANIZATION,
  project: process.env.OPENAI_PROJECT_ID,
});

export async function POST(req) {
  try {
    const { messages, chatId } = await req.json();

    //INFO: Get the chat record from the database and check if it exists
    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
    if (_chats.length !== 1) {
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    const fileKey = _chats[0].fileKey; //NOTE: Get the file key from the chat record
    const lastMessage = messages[messages.length - 1];
    const context = await getContext(lastMessage.content, fileKey); //NOTE: Get the context from the chat file

    //INFO: Create a prompt for the AI assistant to generate a response
    const prompt = {
      role: "system",
      content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      AI assistant is a big fan of Pinecone and Vercel.
      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK
      AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.`,
    };

    //INFO: Insert the user's message into the database
    await db.insert(_messages).values({
      chatId,
      content: lastMessage.content,
      role: "user",
    });

    //INFO: Stream the conversation with the AI assistant and insert the response into the database
    const result = await streamText({
      model: openai("gpt-4o-mini"),
      messages: [
        prompt,
        ...messages.filter((message) => message.role === "user"),
      ],
      onFinish: async ({ text }) => {
        await db.insert(_messages).values({
          chatId,
          content: text,
          role: "system",
        });
      },
    });

    return result.toDataStreamResponse(); //NOTE: Return the response from the AI assistant
  } catch (error) {
    return NextResponse.json({ error: "Error creating chat" }, { status: 500 });
  }
}
