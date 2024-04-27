export function generateRandomId(n: number, prefix = "") {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return (
    prefix +
    Array(n)
      .fill(0)
      .map(() => chars.charAt((Math.random() * chars.length) >> 0))
      .join("")
  );
}

export function generateRandomIdBase36(n: number, prefix = "") {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return (
    prefix +
    Array(n)
      .fill(0)
      .map(() => chars.charAt((Math.random() * chars.length) >> 0))
      .join("")
  );
}

let sequence = 0;

//時系列に並んだIDのジェネレータ
//Twitter Snowflakeの形式を参考にした簡易実装
//IDを文字列形式で出力
//workerIdは省略
//複数のコンテナなどで実行すると値が重複する可能性があるので注意
//DBのユニーク制約などで(まれに発生する可能性のある)重複を排除して使用する想定
//DBにキーとして格納する値以外での使用は非推奨
export function generateIdTimeSequential(
  prefix = "",
  incrementSequence = true,
): string {
  const d1 = Date.now();
  const d2 = new Date("2020-01-01T00:00:00Z").getTime();
  const timePart = d1 - d2;
  const fullValue = Number((BigInt(timePart) << 12n) | BigInt(sequence));
  if (incrementSequence) {
    sequence = (sequence + 1) & 0xfff;
  }
  return prefix + fullValue.toString(36);
}

export function generateIdTimeSequential_recoverNumberFormat(id: string) {
  return parseInt(id, 36);
}

export function generateIdTimeSequential_temporal() {
  return generateIdTimeSequential("", false);
}
