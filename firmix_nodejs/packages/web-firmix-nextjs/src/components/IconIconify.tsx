import { Box } from "@mui/system";
import { createFCE } from "../common_styling/create_fce";

type Props = {
  spec: string;
};

export const IconIconify = createFCE<Props>(({ spec }) => {
  return (
    <Box display="inline-flex">
      {/* @ts-ignore */}
      <iconify-icon icon={spec} />
    </Box>
  );
});
