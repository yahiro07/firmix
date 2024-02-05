// https://qiita.com/suin/items/122b24c246ce51fa5103
export function getDateTimeText_yyyyMMddHHmmss(date = new Date()) {
  return new Intl.DateTimeFormat("ja-jp", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}
