import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function getEmbeddings(text) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text.replace(/\n/g, " "),
    });
    const result = response.data[0].embedding;
    return result;
  } catch (error) {
    throw new Error("Could not embed text");
  }
}
