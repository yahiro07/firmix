import { raiseError } from "~/aux/utils/error_util.ts";
import { FirmwareFormat } from "~/base/types_app_common.ts";
import { serverShell } from "~/central/server_shell.ts";
import { createPostHandler } from "~/system/route_helper.ts";

export const handler = createPostHandler(async (req, _ctx) => {
  const authHeaderValue = req.headers.get("Authorization");
  const apiKey = authHeaderValue?.split(" ")[1];
  if (!apiKey) {
    raiseError(`api key required`);
  }

  const form = await req.formData();

  const getFormValue = (key: string) => {
    const value = form.get(key);
    if (!value) {
      raiseError(`payload ${key} undefined`);
    }
    return value;
  };
  const file_readme = getFormValue("readme") as File;
  const file_metadata = getFormValue("metadata") as File;
  const file_firmware = getFormValue("firmware") as File;

  const readmeFileContent = await file_readme.text();
  const metadataFileContent = await file_metadata.text();
  const firmwareFileBytes = new Uint8Array(await file_firmware.arrayBuffer());
  const firmwareFormat = file_firmware.name.split(".")[1] as FirmwareFormat;

  const allDataExists =
    readmeFileContent.length > 0 &&
    metadataFileContent.length > 0 &&
    firmwareFileBytes.length > 0 &&
    firmwareFormat.length > 0;

  if (!allDataExists) {
    raiseError(`incomplete payload data`);
  }

  await serverShell.projectService.upsertProject({
    apiKey,
    readmeFileContent,
    metadataFileContent,
    firmwareFormat,
    firmwareFileBytes,
  });

  return Response.json({ success: 1 });
});
