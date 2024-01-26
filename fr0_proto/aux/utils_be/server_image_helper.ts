import { decode } from "https://deno.land/x/imagescript@v1.2.14/mod.ts";

export const serverImageHelper = {
  async getImageSize(imageDataBytes: Uint8Array) {
    const img = await decode(imageDataBytes);
    return { w: img.width, h: img.height };
  },
};
