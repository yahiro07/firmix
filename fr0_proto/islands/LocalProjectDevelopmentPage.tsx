import { useReasyState } from "~/aux/reasy/reasy_state_local.ts";
import { LocalDevelopmentWork } from "~/cathedral/firmix_presenter/types.ts";
import { LocalProjectLoadingArea } from "~/features/LocalProjectLoadingArea.tsx";

export default function LocalProjectDevelopmentPage() {
  const [{ work }, { setWork }] = useReasyState({
    work: undefined as (LocalDevelopmentWork | undefined),
  });

  return (
    <div>
      <LocalProjectLoadingArea setWork={setWork} />
      <div>
        {work?.state === "loaded" && (
          <div>
            <div>{work.project.firmwareContainer.fileName}</div>
          </div>
        )}
        {work?.state === "error" && <div>{work.message}</div>}
      </div>
    </div>
  );
}
