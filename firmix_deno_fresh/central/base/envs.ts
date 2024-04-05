import { raiseError } from "~/auxiliaries/utils/error_util.ts";

type EnvVariables = {
  ENV_TYPE: "development" | "production";
  MONGO_URL: string;
  MONGO_DATABASE_NAME: string;
  R2_ACCESS_KEY_ID: string;
  R2_ACCESS_KEY_SECRET: string;
  R2_ENDPOINT_URL: string;
  R2_BUCKET_NAME: string;
  R2_PUBLIC_URL: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  JWT_SECRET: string;
};

export function getEnvVariable<K extends keyof EnvVariables>(
  key: K
): EnvVariables[K] {
  const value = Deno.env.get(key) as EnvVariables[K];
  if (!value) raiseError(`env variable ${key} undefined`);
  return value;
}

export function getEnvVariableMaybe<K extends keyof EnvVariables>(
  key: K
): EnvVariables[K] | undefined {
  return Deno.env.get(key) as EnvVariables[K] | undefined;
}
