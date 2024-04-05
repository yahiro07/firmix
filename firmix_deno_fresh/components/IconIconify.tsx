import { createFC } from "~/auxiliaries/utils_fe/create_fc.ts";

type Props = {
  spec: string;
};

export const IconIconify = createFC<Props>(({ spec }) => {
  // deno-lint-ignore ban-ts-comment
  //@ts-ignore
  return <iconify-icon icon={spec} />;
});
