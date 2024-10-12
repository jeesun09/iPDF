import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./download-from-s3";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import getEmbeddings from "./embedding";
import md5 from "md5";
import fs from "fs";

let pinecone = null;
export const getPineconeClient = async () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
  }
  return pinecone;
};

export async function  loadS3IntoPinecone(file_key) {
  const file_name = await downloadFromS3(file_key);
  if (!file_name) {
    throw new Error("Could not download file from S3");
  }
  try {
    const loader = new PDFLoader(file_name);
    const pages = await loader.load();
    const documents = await Promise.all(
      pages.map((page) => prepareDocument(page))
    );
    const vectors = await Promise.all(
      documents.flat().map((doc) => embedDocument(doc))
    );
    // upload to pinecone
    const client = await getPineconeClient();
    const pineconeIndex = client.index("insight-pdf");
    const namespace = pineconeIndex.namespace(convertToASCII(file_key));
    await namespace.upsert(vectors);
    return documents[0];
  } catch (error) {
    console.error("Error loading S3 into Pinecone:", error);
    throw error;
  } finally {
    try {
      await fs.promises.unlink(file_name);
    } catch (unlinkError) {
      console.error("Error deleting file:", unlinkError);
    }
  }
}

async function embedDocument(doc) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);
    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    };
  } catch (error) {
    console.log("Could not embed document", error);
    throw error;
  }
}

async function prepareDocument(page) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}

export const truncateStringByBytes = (str, bytes) => {
  const encoder = new TextEncoder();
  return new TextDecoder("utf-8").decode(encoder.encode(str).slice(0, bytes));
};

export function convertToASCII(str) {
  const asciiString = str.replace(/[^\x00-\x7F]+/g, "");
  return asciiString;
}
