export function pickObjectMembers<T extends {}, K extends keyof T>(
  obj: T,
  fieldNames: K[]
): Pick<T, K> {
  return Object.fromEntries(
    fieldNames.map((fieldName) => [fieldName, obj[fieldName]])
  ) as Pick<T, K>;
}

export function copyObjectMembers<T extends {}>(
  dst: T,
  src: Partial<T>,
  acceptableKeys: (keyof T)[]
) {
  for (const key in src) {
    if (acceptableKeys.includes(key)) {
      dst[key] = src[key]!;
    }
  }
}

export function executeInline<T>(fn: () => T): T {
  return fn();
}
