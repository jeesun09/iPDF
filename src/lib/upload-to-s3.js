import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// Upload file to S3
export async function uploadToS3(file) {
  try {
    const s3 = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
      },
    });
    const file_key =
      "uploads/" + Date.now().toString() + file.name.replace(" ", "-");

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: file_key,
      Body: file,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);

    return {
      file_key,
      file_name: file.name,
    };
  } catch (error) {
    console.error("Error uploading file to S3:", error.message);
    throw error;
  }
}

export function getS3Url(file_key) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${file_key}`;
  return url;
}
