export function parseIntCheckedZeroOrPositiveInteger(
  text: string,
  radix?: number | undefined
) {
  const res = parseInt(text, radix);
  if (isFinite(res) && res >= 0) {
    return res;
  } else {
    throw new Error(`failed to parse to integer, ${text}`);
  }
}

export function numberToHexString(value: number) {
  return "0x" + value.toString(16);
}
