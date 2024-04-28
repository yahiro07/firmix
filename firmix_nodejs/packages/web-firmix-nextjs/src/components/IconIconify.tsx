import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { Box } from "../../styled-system/jsx";

type Props = {
  spec: string;
};

export const IconIconify = createFC<Props>(({ spec }) => {
  return (
    <Box display="inline-flex">
      {/* @ts-ignore */}
      <iconify-icon icon={spec} />
    </Box>
  );
});
