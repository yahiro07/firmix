import {
  ConfigurationSourceItem_Valid,
  ProjectDetailDto,
} from "~/base/dto_types.ts";
import { serverShell } from "~/server/server_shell.ts";

type Props = {
  project: ProjectDetailDto;
};

export default function ProjectDetailPage({ project }: Props) {
  const handleDownload = async () => {
    const { fileName, fileContentBytes } = await serverShell
      .downloadPatchedFirmware(
        project.projectId,
        [],
      );
    const blob = new Blob([fileContentBytes.buffer], {
      type: "application-octet-binary",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };
  const hasError = project.configurationSourceItems.some((it) =>
    it.dataKind === "error"
  );
  const configurationSourceItems = project
    .configurationSourceItems as ConfigurationSourceItem_Valid[];

  const inputIdPrefix = `config-input-`;
  return (
    <div>
      <div>
        project name: {project.projectName}
      </div>
      <div>
        introduction: {project.introduction}
      </div>
      <div>
        target mcu: {project.targetMcu}
      </div>
      {hasError && (
        <div>
          カスタムデータの定義にエラーがあります
        </div>
      )}
      {!hasError && (
        <div>
          {configurationSourceItems.map((item) => (
            <div key={item.key}>
              <label>{item.label} (GPIO x{item.dataCount})</label>
              <span>{item.instruction}</span>
              <input id={`${inputIdPrefix}${item.key}`}></input>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleDownload} disabled={hasError}>download</button>
    </div>
  );
}
