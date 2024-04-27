import { getDateTimeTextWithElapsed } from "@mx/auxiliaries/utils/date_time_helper";
import { useMemo } from "react";

export function useDateTimeTextWithElapsed(
  timestamp: number,
  currentTimestamp?: number
): string {
  return useMemo(
    () => getDateTimeTextWithElapsed(timestamp, currentTimestamp),
    [timestamp, currentTimestamp]
  );
}
