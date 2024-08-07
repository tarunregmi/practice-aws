import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3BucketName = process.env.AWS_S3_BUCKET_NAME;

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: String(process.env.AWS_ACCESS_KEY),
    secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
  },
});

/**
 *
 * @param {string} key Object key from aws console.
 * @param {number} duration Time in seconds.
 * @returns {Promise<string>} Presigned url of object.
 */
export const getObjectURL = async (key: string, duration: number): Promise<string> => {
  const command = new GetObjectCommand({
    Key: key,
    Bucket: s3BucketName,
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: duration,
  });

  return url;
};

/**
 *
 * @param {string} key File name with extension
 * @param {string} type File `MIME` type
 * @param {number} duration Time in seconds.
 * @returns {Promise<string>} Presigned url of object.
 */
export const putObjectURL = async (key: string, type: string, duration: number): Promise<string> => {
  const folder = `AWS_S3_${type.split('/')[0].toUpperCase()}S_FOLDER`;

  const command = new PutObjectCommand({
    Key: `${process.env[folder]}/${Date.now()}-${key}`,
    Bucket: s3BucketName,
    ContentType: type,
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: duration,
  });

  return url;
};
