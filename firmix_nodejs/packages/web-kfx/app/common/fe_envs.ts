import { raiseError } from "@mx/auxiliaries/utils/error_util";

type FeEnvVariables = {
  ENV_TYPE: "development" | "production";
};

export function getFeEnvVariableMaybe<K extends keyof FeEnvVariables>(
  key: K
): FeEnvVariables[K] | undefined {
  if (typeof window === "undefined") {
    return process.env[key] as FeEnvVariables[K] | undefined;
  } else {
    return (window as any).ENV[key];
  }
}

export function getFeEnvVariable<K extends keyof FeEnvVariables>(
  key: K
): FeEnvVariables[K] {
  const value = getFeEnvVariableMaybe(key);
  if (!value) raiseError(`env variable ${key} undefined`);
  return value;
}
