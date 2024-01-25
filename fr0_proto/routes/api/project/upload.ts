import { decode } from "https://deno.land/x/imagescript@v1.2.14/mod.ts";
import { createPostHandler } from "~/system/route_helper.ts";

export const handler = createPostHandler(async (req, _ctx) => {
  console.log({ req });
  const authHeaderValue = req.headers.get("Authorization");
  const apiKey = authHeaderValue?.split(" ")[1];

  console.log({ authHeaderValue, apiKey });

  const form = await req.formData();
  const foo = form.get("foo")?.toString();
  console.log({ foo });
  const file_readme = form.get("readme") as File;
  const file_metadata = form.get("metadata") as File;
  const file_thumbnail = form.get("thumbnail") as File;
  const file_firmware = form.get("firmware") as File;

  console.log({ file_readme, file_metadata, file_thumbnail, file_firmware });

  const readmeFileContent = await file_readme.text();
  const metadataFileContent = await file_metadata.text();
  const thumbnailImageBytes = await file_thumbnail.arrayBuffer();
  const thumbnailMimeType = file_thumbnail.type;
  const firmwareFileBytes = await file_firmware.arrayBuffer();

  const img = await decode(new Uint8Array(thumbnailImageBytes));
  console.log({ w: img.width, h: img.height });

  console.log({
    readmeFileContent,
    metadataFileContent,
    img_sz: thumbnailImageBytes.byteLength,
    thumbnailMimeType,
    frm_sz: firmwareFileBytes.byteLength,
  });

  return Response.json({ success: 1 });
});
