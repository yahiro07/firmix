export type FirmwarePatchingBlob = {
  entries: {
    marker: string;
    dataBytes: number[];
  }[];
};
