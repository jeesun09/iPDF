import { Pinecone } from "@pinecone-database/pinecone";
import getEmbeddings from "./embedding";
import { convertToASCII } from "./pinecone";

//INFO: Get the matches from the Pinecone database for the query embeddings
export async function getMatchesFromEmbedding(embeddings, fileKey) {
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const index = await pinecone.index("insight-pdf");
  try {
    const namespace = convertToASCII(fileKey);
    const queryResult = await index.namespace(`${namespace}`).query({
      topK: 5, //NOTE: Get the top 5 matches from the Pinecone database
      vector: embeddings, //NOTE: Query embeddings for the query text
      includeMetadata: true, //NOTE: Include metadata in the query result
    });
    return queryResult.matches || []; //NOTE: Return the matches from the query result
  } catch (error) {
    throw new Error("Error getting matches from Pinecone");
  }
}

//INFO: Get the context for the query from the Pinecone database
export async function getContext(query, fileKey) {
  const queryEmbeddings = await getEmbeddings(query); //NOTE: Get embeddings for the query text
  const matches = await getMatchesFromEmbedding(queryEmbeddings, fileKey); //NOTE: Get matches from Pinecone for the query embeddings

  //INFO: Filter out the matches with a score less than 0.7
  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );
  //INFO: If no matches are found with a score greater than 0.7, get the document with the highest score
  if (qualifyingDocs.length === 0) {
    let maxScoreDoc = matches.reduce(
      (max, match) => (match.score && match.score > max.score ? match : max),
      matches[0]
    );
    qualifyingDocs.push(maxScoreDoc);
  }
  let docs = qualifyingDocs.map((match) => match.metadata.text); //NOTE: Get the text of the qualifying documents from the metadata

  return docs.join("\n").substring(0, 3000); //NOTE: Return the context as a string with a maximum length of 3000 characters
}
