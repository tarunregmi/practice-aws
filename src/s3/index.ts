import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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
    Bucket: process.env.AWS_BUCKET_NAME,
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: duration,
  });

  return url;
};
