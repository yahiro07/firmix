import { getEnvVariable } from "@m/web-firmix/central/base/envs.ts";
import { raiseError } from "auxiliaries/utils/error_util";

if (typeof window !== "undefined") {
  raiseError(`invalid import, this code must not loaded in frontend`);
}

const envType = getEnvVariable("ENV_TYPE");

export const serverConfig = {
  isDevelopment: envType === "development",
};
