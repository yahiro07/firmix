const uf2Config = {
  blockSize: 512,
  blockHeaderSize: 32,
  blockPayloadLength: 256,
};

export function firmwareBinaryModifier_patchUf2FileContent(
  originalFirmwareBytes: Uint8Array,
  callback: (binaryBytes: Uint8Array) => void,
): Uint8Array {
  const { blockSize, blockHeaderSize, blockPayloadLength } = uf2Config;

  const blocks = splitBytesN(originalFirmwareBytes, blockSize);

  const srcPayloads = blocks.map((block) =>
    block.slice(blockHeaderSize, blockHeaderSize + blockPayloadLength)
  );
  const binaryBytes = mergeUint8Arrays(srcPayloads);
  callback(binaryBytes);
  const modPayloads = splitBytesN(binaryBytes, blockPayloadLength);

  blocks.forEach((block, i) => replaceArrayContent(block, 32, modPayloads[i]));

  return new Uint8Array(mergeUint8Arrays(blocks));
}

function splitBytesN(bytes: Uint8Array, n: number): Uint8Array[] {
  const m = Math.ceil(bytes.length / n);
  return Array(m)
    .fill(0)
    .map((_, i) => bytes.slice(i * n, i * n + n));
}

function mergeUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((total, arr) => (total + arr.length), 0);
  const res = new Uint8Array(totalLength);
  let pos = 0;
  for (const arr of arrays) {
    res.set(arr, pos);
    pos += arr.length;
  }
  return res;
}

function replaceArrayContent(
  dst: Uint8Array,
  dstOffset: number,
  src: Uint8Array,
) {
  for (let i = 0; i < src.length; i++) {
    dst[dstOffset + i] = src[i];
  }
}
