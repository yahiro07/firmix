import { serverShell } from "~/server/server_shell.ts";
import { ProjectDetail } from "../base/domain_types.ts";

type Props = {
  project: ProjectDetail;
};

export default function ProjectDetailPage({ project }: Props) {
  const handleDownload = async () => {
    const binaryBytes = await serverShell.downloadPatchedFirmware(
      project.projectId,
      [],
    );
    console.log(binaryBytes.byteLength);
  };
  return (
    <div>
      <div>
        project id: {project.projectId}
      </div>
      <div>
        target mcu: {project.metaData.targetMcu}
      </div>

      <button onClick={handleDownload}>download</button>
    </div>
  );
}
