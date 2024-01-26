import { Md5 } from "https://deno.land/std@0.119.0/hash/md5.ts";

export function generateHashMd5(input: string | Uint8Array) {
  return new Md5().update(input).toString();
}
