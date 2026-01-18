import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Cloudflare R2 Storage Client
 * S3-compatible object storage
 */

// Initialize R2 client (only if credentials are available)
function getR2Client(): S3Client | null {
  if (
    !process.env.CLOUDFLARE_ACCOUNT_ID ||
    !process.env.R2_ACCESS_KEY_ID ||
    !process.env.R2_SECRET_ACCESS_KEY
  ) {
    return null;
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

const BUCKET_NAME = process.env.R2_BUCKET_NAME || "uploads";

/**
 * Generate a presigned URL for uploading a file
 */
export async function getUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 3600 // 1 hour
): Promise<string> {
  const client = getR2Client();
  if (!client) {
    throw new Error("R2 storage is not configured");
  }

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(client, command, { expiresIn });
}

/**
 * Generate a presigned URL for downloading a file
 */
export async function getDownloadUrl(
  key: string,
  expiresIn = 3600 // 1 hour
): Promise<string> {
  const client = getR2Client();
  if (!client) {
    throw new Error("R2 storage is not configured");
  }

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(client, command, { expiresIn });
}

/**
 * Delete a file from R2
 */
export async function deleteFile(key: string): Promise<void> {
  const client = getR2Client();
  if (!client) {
    throw new Error("R2 storage is not configured");
  }

  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await client.send(command);
}

/**
 * List files in a directory
 */
export async function listFiles(
  prefix: string,
  maxKeys = 100
): Promise<{ key: string; size: number; lastModified: Date }[]> {
  const client = getR2Client();
  if (!client) {
    throw new Error("R2 storage is not configured");
  }

  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: prefix,
    MaxKeys: maxKeys,
  });

  const response = await client.send(command);

  return (
    response.Contents?.map((item) => ({
      key: item.Key!,
      size: item.Size || 0,
      lastModified: item.LastModified || new Date(),
    })) || []
  );
}

/**
 * Generate a unique file key with user folder
 */
export function generateFileKey(userId: string, filename: string, folder = "uploads"): string {
  const timestamp = Date.now();
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  return `${folder}/${userId}/${timestamp}-${sanitizedFilename}`;
}

/**
 * Check if R2 storage is configured
 */
export function isR2Configured(): boolean {
  return !!(
    process.env.CLOUDFLARE_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY
  );
}
