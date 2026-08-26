const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/s3');

const BUCKET = process.env.AWS_BUCKET_NAME;
const BASE_URL = process.env.AWS_MEDIA_BASE_URL; // e.g. https://cdn.yourdomain.com or CloudFront URL

/**
 * S3 key se public URL banata hai.
 * @param {string} key - S3 object key
 * @returns {string|null}
 */
const buildUrl = (key) => {
  if (!key) return null;
  if (key.startsWith('http://') || key.startsWith('https://')) return key;
  const base = BASE_URL?.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  return `${base}/${key}`;
};

/**
 * Buffer ko S3 pe upload karta hai.
 * @param {Buffer} buffer
 * @param {string} key - S3 object key (e.g. 'images/photo.webp')
 * @param {string} mimetype
 * @returns {Promise<{ key: string, url: string }>}
 */
const uploadBuffer = async (buffer, key, mimetype) => {
  if (!BUCKET) throw new Error('AWS_BUCKET_NAME is not set in .env');

  await s3Client.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: mimetype,
  }));

  return { key, url: buildUrl(key) };
};

/**
 * S3 se object delete karta hai.
 * @param {string} key
 */
const deleteObject = async (key) => {
  if (!key || !BUCKET) return;
  try {
    await s3Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
  } catch (err) {
    console.error(`S3 delete failed (key: ${key}):`, err.message);
  }
};

module.exports = { uploadBuffer, deleteObject, buildUrl };
