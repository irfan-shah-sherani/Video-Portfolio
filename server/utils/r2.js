const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { randomUUID } = require('crypto');

function getS3Client() {
  const endpoint = process.env.R2_ENDPOINT;
  const region = process.env.R2_REGION || 'auto';
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error('R2_ENDPOINT, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY must be set');
  }

  return new S3Client({
    region,
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });
}

function sanitizeFilename(name) {
  return String(name || '')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 150);
}

function buildObjectKey({ userId, filename }) {
  const safe = sanitizeFilename(filename);
  const uid = randomUUID();
  return `${userId}/${uid}-${safe}`;
}

function getPublicUrl(key) {
  const base = process.env.R2_PUBLIC_BASE_URL;
  if (!base) return '';
  return `${base.replace(/\/+$/, '')}/${key}`;
}

async function createPresignedPutUrl({ key, contentType, expiresInSeconds = 300 }) {
  const Bucket = process.env.R2_BUCKET;
  if (!Bucket) throw new Error('R2_BUCKET must be set');

  const s3 = getS3Client();
  const command = new PutObjectCommand({
    Bucket,
    Key: key,
    ContentType: contentType || 'application/octet-stream',
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
  return { uploadUrl };
}

async function deleteObject(key) {
  const Bucket = process.env.R2_BUCKET;
  if (!Bucket) throw new Error('R2_BUCKET must be set');
  const s3 = getS3Client();
  await s3.send(new DeleteObjectCommand({ Bucket, Key: key }));
}

module.exports = {
  buildObjectKey,
  getPublicUrl,
  createPresignedPutUrl,
  deleteObject,
};