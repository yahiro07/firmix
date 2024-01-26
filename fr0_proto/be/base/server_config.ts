import { getEnvVariable } from "~/be/base/envs.ts";

const envType = getEnvVariable("ENV_TYPE");

export const serverConfig = {
  isDevelopment: envType === "development",
};
