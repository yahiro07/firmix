export function downloadBinaryFileBlob(
  fileName: string,
  contentBytes: Uint8Array,
) {
  const blob = new Blob([contentBytes.buffer], {
    type: "application-octet-binary",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}
