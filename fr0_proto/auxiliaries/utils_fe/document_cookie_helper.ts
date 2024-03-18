export function getDocumentCookieValue(key: string): string | undefined {
  const obj = Object.fromEntries(
    document.cookie
      .split(";")
      .map((part) => part.split("=").map((it) => it.trim()) as [string, string])
  );
  return obj[key];
}

export function setDocumentCookie(key: string, value: string) {
  document.cookie = `${key}=${value}`;
}
