import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export function createPage(
  fn: (args: { params: Params }) => JSX.Element | Promise<JSX.Element>
) {
  return fn;
}

function createCommonRequestHandler(
  fn: (args: {
    request: Request;
    params: Params;
  }) => Response | Promise<Response>
) {
  return (request: Request, { params }: { params: Params }) => {
    return fn({ request, params });
  };
}

export const createGetHandler = createCommonRequestHandler;
export const createPostHandler = createCommonRequestHandler;

export async function readRequestBody<T = object>(req: Request): Promise<T> {
  const buf = await req.arrayBuffer();
  const text = new TextDecoder().decode(buf);
  return JSON.parse(text);
}

export function responseRedirect(destPath: string) {
  return new Response(null, { status: 302, headers: { location: destPath } });
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

export function responseJson(content: object) {
  return new Response(JSON.stringify(content), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
