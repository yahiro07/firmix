import { createObjectStorageBridge } from "@mx/auxiliaries/object_storage_bridge/mod";
import { getEnvVariable } from "web-kfx/app/central/base/envs";

export const objectStorageBridge = createObjectStorageBridge({
  s3_access_key_id: getEnvVariable("S3_ACCESS_KEY_ID"),
  s3_access_key_secret: getEnvVariable("S3_ACCESS_KEY_SECRET"),
  s3_endpoint_url: getEnvVariable("S3_ENDPOINT_URL"),
  s3_bucket_name: getEnvVariable("S3_BUCKET_NAME"),
});
