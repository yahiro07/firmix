export const serverFetchHelper = {
  async fetchJson<T>(
    url: string,
    init: RequestInit,
  ): Promise<T> {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return (await response.json()) as T;
  },
  async fetchBinary(
    url: string,
    init: RequestInit,
  ): Promise<Uint8Array> {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  },
  async postJson<TRequestBody, TResponseBody>(
    url: string,
    reqBody: TRequestBody,
    options?: { headers?: Record<string, string>; methodOverride?: string },
  ): Promise<TResponseBody> {
    const res = await fetch(url, {
      method: options?.methodOverride ?? "POST",
      body: JSON.stringify(reqBody),
      headers: { "content-type": "application/json", ...options?.headers },
    });
    const success = res.status < 400;
    const isJson = res.headers.get("Content-Type")?.includes(
      "application/json",
    );
    if (success) {
      return (isJson ? await res.json() : await res.text());
    } else {
      const detail = (
        isJson ? (await res.json()).error : await res.text()
      ) as string;
      const errorMessage = `failed to post to ${url}, ${detail}`;
      throw new Error(errorMessage);
    }
  },
};
