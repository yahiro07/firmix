import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";
import { storehouse_ensureDbConnected } from "../central/depot/storehouse";

export function createPage(
  fn: (args: { params: Params }) => JSX.Element | Promise<JSX.Element>
) {
  return async (args: { params: Params }) => {
    await storehouse_ensureDbConnected();
    return fn(args);
  };
}

function createCommonRequestHandler(
  fn: (args: {
    request: NextRequest;
    params: Params;
  }) => Response | Promise<Response>
) {
  return async (request: NextRequest, { params }: { params: Params }) => {
    await storehouse_ensureDbConnected();
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

export function getRequestSourceUrl_NextJS(req: NextRequest) {
  const url = req.nextUrl.toString();
  // const { url } = req;
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
