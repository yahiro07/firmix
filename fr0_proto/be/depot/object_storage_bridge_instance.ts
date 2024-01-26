import { createObjectStorageBridge } from "~/aux/object_storage_bridge/mod.ts";
import { getEnvVariable } from "~/be/base/envs.ts";

export const objectStorageBridge = createObjectStorageBridge({
  r2_access_key_id: getEnvVariable("R2_ACCESS_KEY_ID"),
  r2_access_key_secret: getEnvVariable("R2_ACCESS_KEY_SECRET"),
  r2_endpoint_url: getEnvVariable("R2_ENDPOINT_URL"),
  r2_bucket_name: getEnvVariable("R2_BUCKET_NAME"),
});
