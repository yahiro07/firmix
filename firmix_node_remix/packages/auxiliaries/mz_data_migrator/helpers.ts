import crypto from "crypto";

export namespace mzDataMigrator_internalHelpers {
  export function raiseError(message: string): never {
    throw new Error(message);
  }
  export function itemTo<T, K extends keyof T>(key: K) {
    return (item: T) => item[key];
  }

  export function getTextMd5(input: string) {
    return crypto.createHash("md5").update(input).digest("hex");
  }

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
}
