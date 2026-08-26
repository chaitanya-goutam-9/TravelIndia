const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const { uploadBuffer, deleteObject } = require('./s3.service');

const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
const MIN_QUALITY = 50;

/**
 * Image buffer ko WebP mein convert karta hai, 2MB limit ke andar compress karta hai,
 * aur S3 pe upload karta hai.
 * @param {Object} file - Multer file object (.buffer, .originalname required)
 * @param {string} subfolder - S3 subfolder (e.g. 'tours', 'blogs')
 * @returns {Promise<{ key: string, url: string, alt: string }>}
 */
const saveImage = async (file, subfolder = 'images') => {
  if (!file?.buffer) throw new Error('Invalid file: buffer missing');

  let quality = 90;
  let buffer = await sharp(file.buffer).webp({ quality }).toBuffer();

  // Compress jab tak 2MB ke andar na aa jaye
  while (buffer.length > MAX_SIZE_BYTES && quality > MIN_QUALITY) {
    quality -= 10;
    buffer = await sharp(file.buffer).webp({ quality }).toBuffer();
  }

  // Last resort: resize
  if (buffer.length > MAX_SIZE_BYTES) {
    buffer = await sharp(file.buffer)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: MIN_QUALITY })
      .toBuffer();
  }

  const key = `${subfolder}/${uuidv4()}.webp`;
  const result = await uploadBuffer(buffer, key, 'image/webp');

  return {
    key: result.key,
    url: result.url,
    alt: file.originalname?.split('.')[0] ?? key,
  };
};

/**
 * S3 se image delete karta hai.
 * @param {string} key - S3 object key
 */
const deleteImage = async (key) => {
  await deleteObject(key);
};

module.exports = { saveImage, deleteImage };
