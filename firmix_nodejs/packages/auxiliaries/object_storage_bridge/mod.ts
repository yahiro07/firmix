import * as s3 from "@aws-sdk/client-s3";
import { raiseError } from "../utils/error_util";

type ObjectStorageBridge = {
  uploadBinaryFile(path: string, bytes: Uint8Array): Promise<void>;
  retrieveBinaryFile(path: string): Promise<Uint8Array>;
  uploadImageFile(
    path: string,
    binaryBytes: Uint8Array,
    contentType: string
  ): Promise<void>;
  listItemPathsWithPrefix(prefix: string): Promise<string[]>;
  deleteItem(path: string): Promise<void>;
};

export function createObjectStorageBridge(spec: {
  s3_access_key_id: string;
  s3_access_key_secret: string;
  s3_endpoint_url: string;
  s3_bucket_name: string;
}): ObjectStorageBridge {
  const s3_client = new s3.S3({
    region: "auto",
    endpoint: spec.s3_endpoint_url,
    credentials: {
      accessKeyId: spec.s3_access_key_id,
      secretAccessKey: spec.s3_access_key_secret,
    },
  });
  const bucketName = spec.s3_bucket_name;

  return {
    async uploadBinaryFile(path, bytes) {
      await s3_client.send(
        new s3.PutObjectCommand({
          Bucket: bucketName,
          Key: path,
          Body: bytes,
          ContentType: "application/octet-stream",
          ACL: "public-read",
        })
      );
    },
    async retrieveBinaryFile(path) {
      const res = await s3_client.send(
        new s3.GetObjectCommand({ Bucket: bucketName, Key: path })
      );
      const arr = await res.Body?.transformToByteArray();
      if (!arr) {
        raiseError(`failed to read binary from object storage item: ${path}`);
      }
      return arr;
    },
    async uploadImageFile(path, binaryBytes, contentType) {
      await s3_client.send(
        new s3.PutObjectCommand({
          Bucket: bucketName,
          Key: path,
          Body: binaryBytes,
          ContentType: contentType,
          ACL: "public-read",
        })
      );
    },
    async listItemPathsWithPrefix(prefix) {
      const res = await s3_client.send(
        new s3.ListObjectsV2Command({ Bucket: bucketName, Prefix: prefix })
      );
      return res.Contents?.map((it) => it.Key!) ?? [];
    },
    async deleteItem(path) {
      await s3_client.send(
        new s3.DeleteObjectCommand({ Bucket: bucketName, Key: path })
      );
    },
  };
}
