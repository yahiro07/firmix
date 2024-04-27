export namespace oAuthClientModuleHelpers {
  export async function postJson<T>(url: string, payload: any): Promise<T> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  }

  export const urlHelper = {
    getQueryObject(url: string): Record<string, string> {
      const searchParams = new URLSearchParams(url.split("?")[1]);
      return Object.fromEntries(searchParams);
    },
    replaceUrlPath(url: string, path: string) {
      return `${new URL(url).origin}${path}`;
    },
    buildUrlWithQueries(baseUrl: string, queries: Record<string, string>) {
      const url = new URL(baseUrl);
      for (const key in queries) {
        url.searchParams.append(key, queries[key]);
      }
      return url.toString();
    },
  };

  export function raiseError(message: string): never {
    throw new Error(message);
  }
}
