export function pickObjectMembers<T extends {}, K extends keyof T>(
  obj: T,
  fieldNames: K[],
): Pick<T, K> {
  return Object.fromEntries(
    fieldNames.map((fieldName) => [fieldName, obj[fieldName]]),
  ) as Pick<T, K>;
}
