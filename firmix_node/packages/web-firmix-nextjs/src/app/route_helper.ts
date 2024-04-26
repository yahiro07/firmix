import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export function createPage(
  fn: (args: { params: Params }) => JSX.Element | Promise<JSX.Element>
) {
  return fn;
}

export function createGetHandler(
  fn: (request: Request) => Response | Promise<Response>
) {
  return fn;
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
