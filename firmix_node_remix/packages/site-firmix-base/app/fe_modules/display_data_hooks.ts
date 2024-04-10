import { useMemo } from "~/auxiliaries/fe-deps-react";
import { getDateTimeTextWithElapsed } from "~/auxiliaries/utils/date_time_helper.ts";

export function useDateTimeTextWithElapsed(
  timestamp: number,
  currentTimestamp?: number
): string {
  return useMemo(
    () => getDateTimeTextWithElapsed(timestamp, currentTimestamp),
    [timestamp, currentTimestamp]
  );
}
