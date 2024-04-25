import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";

type Props = {
  spec: string;
};

export const IconIconify = createFC<Props>(({ spec }) => {
  //@ts-ignore
  return <iconify-icon icon={spec} />;
});
