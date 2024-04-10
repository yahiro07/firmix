export function stringifyBytesHex(bytes: number[]): string {
  return bytes
    .map((byte) => byte.toString(16).toUpperCase().padStart(2, "0"))
    .join(" ");
}

export function convertTextToBinaryBytes(
  text: string,
  addNullTerminator: boolean
): number[] {
  const bytes = new TextEncoder().encode(text);
  if (addNullTerminator) {
    return [...bytes, 0];
  } else {
    return [...bytes];
  }
}
