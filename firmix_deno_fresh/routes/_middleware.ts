import { FreshContext } from "$fresh/server.ts";
import { raiseError } from "~/auxiliaries/utils/error_util.ts";
import { storehouse } from "~/central/depot/storehouse.ts";

//connect to db
storehouse;

export const handler = [
  //error handling middleware
  async (req: Request, ctx: FreshContext) => {
    const path = new URL(req.url).pathname;
    try {
      return await ctx.next();
    } catch (error) {
      const errorMessage: string = error?.message ?? "";
      console.log(`error on handling route ${path}`);
      console.error(error);

      if (path.startsWith("/api/")) {
        return Response.json({ error: errorMessage }, { status: 500 });
      } else {
        raiseError(errorMessage);
      }
    }
  },
];
