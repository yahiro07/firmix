import { FreshContext, Handlers } from "$fresh/server.ts";

export function createPostHandler(
  POST: (req: Request, ctx: FreshContext) => Promise<Response>
): Handlers {
  return { POST };
}

export async function readRequestBody<T = object>(req: Request): Promise<T> {
  const buf = await req.arrayBuffer();
  const text = new TextDecoder().decode(buf);
  return JSON.parse(text);
}

export function getRequestSourceUrl(req: Request) {
  const { url } = req;
  if (
    url.startsWith("http://") &&
    req.headers.get("x-forwarded-proto") === "https"
  ) {
    return url.replace("http://", "https://");
  }
  return url;
}
