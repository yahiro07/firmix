export async function ensureFileHandlePermission(
  handle: FileSystemHandle
): Promise<boolean> {
  let permission = await handle.queryPermission({
    mode: "read",
  });
  if (permission === "prompt") {
    permission = await handle.requestPermission({
      mode: "read",
    });
  }
  return permission === "granted";
}
