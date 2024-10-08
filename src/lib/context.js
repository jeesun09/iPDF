import { Pinecone } from "@pinecone-database/pinecone";
import getEmbeddings from "./embedding";
import { convertToASCII } from "./pinecone";

export async function getMatchesFromEmbedding(embeddings, fileKey) {
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const index = await pinecone.index("insight-pdf");
  try {
    const namespace = convertToASCII(fileKey);
    const queryResult = await index.namespace(`${namespace}`).query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });
    return queryResult.matches || [];
  } catch (error) {
    throw new Error("Error getting matches from Pinecone");
  }
}

export async function getContext(query, fileKey) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbedding(queryEmbeddings, fileKey);
  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );
  if (qualifyingDocs.length === 0) {
    let maxScoreDoc = matches.reduce(
      (max, match) => (match.score && match.score > max.score ? match : max),
      matches[0]
    );
    qualifyingDocs.push(maxScoreDoc);
  }
  let docs = qualifyingDocs.map((match) => match.metadata.text);

  return docs.join("\n").substring(0, 3000);
}
