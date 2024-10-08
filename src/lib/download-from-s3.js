//Download file from S3
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import path from "path";
import fs from "fs";
import os from "os";

export async function downloadFromS3(file_key) {
  try {
    const s3 = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
      },
    });
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: file_key,
    };
    const command = new GetObjectCommand(params);
    const response = await s3.send(command);
    const tmpDir = os.tmpdir();
    const file_name = path.join(tmpDir, `pdf-${Date.now()}.pdf`);

    const writeStream = fs.createWriteStream(file_name);
    const readableStream = response.Body;

    readableStream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
    console.log(`File downloaded and saved at ${file_name}`);
    
    return file_name;
  } catch (error) {
    console.error("Error downloading file from S3:", error.message);
    throw error;
  }
}
