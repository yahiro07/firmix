import { raiseError } from "@mx/auxiliaries/utils/error_util";
import { getEnvVariable } from "./envs";

if (typeof window !== "undefined") {
  raiseError(`invalid import, this code must not loaded in frontend`);
}

const envType = getEnvVariable("ENV_TYPE");

export const serverConfig = {
  isDevelopment: envType === "development",
};
