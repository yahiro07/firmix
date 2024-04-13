import { raiseError } from "auxiliaries/utils/error_util";

type EnvVariables = {
  ENV_TYPE: "development" | "production";
  MONGO_URL: string;
  MONGO_DATABASE_NAME: string;
  S3_ACCESS_KEY_ID: string;
  S3_ACCESS_KEY_SECRET: string;
  S3_ENDPOINT_URL: string;
  S3_BUCKET_NAME: string;
  S3_PUBLIC_URL: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  JWT_SECRET: string;
  SITE_VARIANT: "base" | "kfx";
};

export function getEnvVariable<K extends keyof EnvVariables>(
  key: K
): EnvVariables[K] {
  const value = process.env[key] as EnvVariables[K];
  if (!value) raiseError(`env variable ${key} undefined`);
  return value;
}

export function getEnvVariableMaybe<K extends keyof EnvVariables>(
  key: K
): EnvVariables[K] | undefined {
  return process.env[key] as EnvVariables[K] | undefined;
}
