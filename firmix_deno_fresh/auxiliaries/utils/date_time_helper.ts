// https://qiita.com/suin/items/122b24c246ce51fa5103
export function getDateTimeText_yyyyMMddHHmmss(timestamp: number): string {
  if (timestamp === 0) return "";
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("ja-jp", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

type ITimeUnitKey = "second" | "minute" | "hour" | "day" | "month" | "year";

type IElapsedTimeTextSource = {
  prefix: string;
  second: string | [string, string];
  minute: string | [string, string];
  hour: string | [string, string];
  day: string | [string, string];
  month: string | [string, string];
  year: string | [string, string];
  suffix: string;
};

function formatElapsedTimeText(
  value: number,
  unitKey: ITimeUnitKey,
  textSource: IElapsedTimeTextSource
) {
  const { prefix, suffix } = textSource;
  const unitTextDef = textSource[unitKey];
  const modUnit =
    value > 1 && Array.isArray(unitTextDef)
      ? unitTextDef[1]
      : Array.isArray(unitTextDef)
      ? unitTextDef[0]
      : unitTextDef;
  return `${value}${prefix}${modUnit}${suffix}`;
}

function dateHelpers_getElapsedTimeText_impl(
  timestamp: number,
  textSource: IElapsedTimeTextSource,
  currentTimestamp = Date.now()
) {
  const diff = currentTimestamp - timestamp;
  const sec = (diff / 1000) >> 0;
  const min = (sec / 60) >> 0;
  const hour = (min / 60) >> 0;
  const day = (hour / 24) >> 0;
  const month = (day / 30) >> 0;
  const year = (month / 12) >> 0;

  if (sec < 60) {
    return formatElapsedTimeText(sec, "second", textSource);
  } else if (min < 60) {
    return formatElapsedTimeText(min, "minute", textSource);
  } else if (hour < 24) {
    return formatElapsedTimeText(hour, "hour", textSource);
  } else if (day < 30) {
    return formatElapsedTimeText(day, "day", textSource);
  } else if (month < 12) {
    return formatElapsedTimeText(month, "month", textSource);
  } else {
    return formatElapsedTimeText(year, "year", textSource);
  }
}

// deno-lint-ignore no-unused-vars
const elapsedTimeTextSource_en: IElapsedTimeTextSource = {
  prefix: " ",
  second: ["second", "seconds"],
  minute: ["minute", "minutes"],
  hour: ["hour", "hours"],
  day: ["day", "days"],
  month: ["month", "months"],
  year: ["year", "years"],
  suffix: " ago",
};

const elapsedTimeTextSource_ja: IElapsedTimeTextSource = {
  prefix: "",
  second: "秒",
  minute: "分",
  hour: "時間",
  day: "日",
  month: "ヶ月",
  year: "年",
  suffix: "前",
};

export function getElapsedTimeText(
  timestamp: number,
  currentTimestamp?: number
): string {
  return dateHelpers_getElapsedTimeText_impl(
    timestamp,
    elapsedTimeTextSource_ja,
    currentTimestamp
  );
}

export function getDateTimeTextWithElapsed(
  timestamp: number,
  currentTimestamp?: number
): string {
  const base = getDateTimeText_yyyyMMddHHmmss(timestamp);
  const elapsed = getElapsedTimeText(timestamp, currentTimestamp);
  return `${base} (${elapsed})`;
}
