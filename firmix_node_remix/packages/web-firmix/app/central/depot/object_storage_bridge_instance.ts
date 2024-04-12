import { createObjectStorageBridge } from "auxiliaries/object_storage_bridge/mod";
import { getEnvVariable } from "web-firmix/app/central/base/envs";

export const objectStorageBridge = createObjectStorageBridge({
  r2_access_key_id: getEnvVariable("R2_ACCESS_KEY_ID"),
  r2_access_key_secret: getEnvVariable("R2_ACCESS_KEY_SECRET"),
  r2_endpoint_url: getEnvVariable("R2_ENDPOINT_URL"),
  r2_bucket_name: getEnvVariable("R2_BUCKET_NAME"),
});
