import { Box } from "@chakra-ui/react";
import { createFCE2 } from "auxiliaries/utils_fe_react/create_fce";

type Props = {
  spec: string;
};

export const IconIconify = createFCE2<Props>(({ spec }) => {
  return (
    <Box display="inline-flex">
      {/* @ts-ignore */}
      <iconify-icon icon={spec} />
    </Box>
  );
});
