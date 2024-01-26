import { FreshContext, Handlers } from "$fresh/server.ts";

export function createGetHandler(
  GET: (req: Request, ctx: FreshContext) => Response | Promise<Response>
): Handlers {
  return { GET };
}

export function createPostHandler(
  POST: (req: Request, ctx: FreshContext) => Response | Promise<Response>
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

export function responseRedirect(destPath: string) {
  return new Response(null, { status: 302, headers: { location: destPath } });
}
