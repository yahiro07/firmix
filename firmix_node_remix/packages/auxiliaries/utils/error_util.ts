export function raiseError(message: string): never {
  throw new Error(message);
}

export function checkNonNull<T>(
  item: T | null | undefined,
  hintObject?: object,
): T {
  if (!item) {
    if (hintObject) {
      const [k, v] = Object.entries(hintObject)[0];
      throw new Error(`item undefined (${k}: ${v})`);
    } else {
      throw new Error(`item undefined`);
    }
  }
  return item;
}
