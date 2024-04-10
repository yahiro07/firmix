import { raiseError } from "auxiliaries/utils/error_util.ts";
import { InputFirmwareFormat } from "~/base/types_app_common.ts";
import { serverShell } from "~/central/server_shell.ts";
import { createPostHandler, responseJson } from "~/system/route_helper.ts";

export const action = createPostHandler(async ({ request }) => {
  const authHeaderValue = request.headers.get("Authorization");
  const apiKey = authHeaderValue?.split(" ")[1];
  if (!apiKey) {
    raiseError(`api key required`);
  }

  const form = await request.formData();

  const getFormValue = (key: string, required = true) => {
    const value = form.get(key);
    if (!value && required) {
      raiseError(`payload ${key} undefined`);
    }
    return value;
  };
  const file_readme = getFormValue("readme") as File;
  const file_project = getFormValue("project") as File;
  const file_board = getFormValue("board", false) as File | undefined;
  const file_firmware = getFormValue("firmware") as File;
  const file_thumbnail = getFormValue("thumbnail") as File;

  const readmeFileContent = await file_readme.text();
  const projectFileContent = await file_project.text();
  const boardFileContent = file_board ? await file_board.text() : "";
  const firmwareFileBytes = new Uint8Array(await file_firmware.arrayBuffer());
  const firmwareFormat = file_firmware.name.split(
    "."
  )[1] as InputFirmwareFormat;
  const thumbnailFileBytes = new Uint8Array(await file_thumbnail.arrayBuffer());

  const allDataExists =
    readmeFileContent.length > 0 &&
    projectFileContent.length > 0 &&
    firmwareFileBytes.length > 0 &&
    firmwareFormat.length > 0 &&
    thumbnailFileBytes.length > 0;

  if (!allDataExists) {
    raiseError(`incomplete payload data`);
  }

  await serverShell.projectService.upsertProject({
    apiKey,
    readmeFileContent,
    projectFileContent,
    boardFileContent,
    firmwareFormat,
    firmwareFileBytes,
    thumbnailFileBytes,
  });

  return responseJson({ success: 1 });
});
