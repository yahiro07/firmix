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

  export function getFunctionBodyTextHash(func: Function) {
    const fnStr = func
      .toString()
      .replaceAll(/\s+/g, " ")
      .replaceAll(/\r?\n/g, "")
      .replaceAll(/__vite_ssr_import_[^.]+\./g, "");
    //devで実行したときに、他のファイルからimportした変数が__vite_ssr_import_0__のような名前になり、
    //productionで実行したときと関数のテキストに差異が出てハッシュが合わなくなる問題がある
    //一旦devで__vite_ssr_import_0__.を削る対応を入れるが、他の要因でもハッシュ値が合わなくなる可能性がある
    //マイグレーションスクリプトも一旦ビルドしてから実行するようにすればこの問題を回避できそう
    const hash = getTextMd5(fnStr);
    // console.log({ fnStr, hash });
    return hash;
  }
}
