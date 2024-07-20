import { S3Client } from "@aws-sdk/client-s3";
import config from "../config";

const s3: S3Client = new S3Client({
  region: config.aws.aws_region,
  credentials: {
    accessKeyId: config.aws.aws_access_key_id,
    secretAccessKey: config.aws.aws_secret_access_key
  }
});

export default s3;
