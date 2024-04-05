import { getEnvVariable } from "~/central/base/envs.ts";

const envType = getEnvVariable("ENV_TYPE");

export const serverConfig = {
  isDevelopment: envType === "development",
};
