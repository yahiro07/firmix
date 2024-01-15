import { raiseError } from "~/aux/utils/error_util.ts";

export function getEnvVariable(key: string) {
  const value = Deno.env.get(key);
  if (!value) raiseError(`env variable ${key} undefined`);
  return value;
}

export function getEnvVariableMaybe(key: string) {
  return Deno.env.get(key);
}
