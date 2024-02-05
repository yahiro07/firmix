export function seqNumbers(n: number) {
  return new Array(n).fill(0).map((_, i) => i);
}

export function padZeros(arr: number[], n: number) {
  return seqNumbers(n).map((i) => arr[i] ?? 0);
}

export function sumArrayNumbers(values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}
