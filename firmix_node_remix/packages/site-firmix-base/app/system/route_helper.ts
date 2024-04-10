import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { raiseError } from "auxiliaries/utils/error_util";
import { ReactNode } from "react";

export function createGetHandler(
  fn: (args: LoaderFunctionArgs) => Promise<Response>
) {
  return fn;
}

export function createPostHandler(
  fn: (args: ActionFunctionArgs) => Promise<Response>
) {
  return (args: ActionFunctionArgs) => {
    if (args.request.method === "POST") {
      return fn(args);
    } else {
      raiseError(`unsupported method ${args.request.method}`);
    }
  };
}

export function createPage(fn: () => ReactNode) {
  return fn;
}

export function createLoader<T>(fn: (args: LoaderFunctionArgs) => Promise<T>) {
  return fn;
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

export function responseJson(content: object) {
  return new Response(JSON.stringify(content), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
