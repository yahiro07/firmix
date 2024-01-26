import { defineRoute } from "$fresh/src/server/defines.ts";
import { DevelopmentPage } from "~/islands/DevelopmentPage.tsx";

export default defineRoute(() => {
  return <DevelopmentPage />;
});
