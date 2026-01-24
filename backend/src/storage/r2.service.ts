import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY!,
    secretAccessKey: process.env.R2_SECRET_KEY!,
  },
});

export async function uploadToR2(
  buffer: Buffer,
  fileName: string,
  mimeType: string,
) {
  const key = `uploads/${Date.now()}-${fileName}`;

  await r2Client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    }),
  );

  const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

  return {
    key,
    url: publicUrl,
  };
}
