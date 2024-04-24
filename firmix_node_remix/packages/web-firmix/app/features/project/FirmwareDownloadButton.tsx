import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import { Box } from "../../../styled-system/jsx";
import { Button } from "../../components/CommonControls";

type Props = {
  label: string;
  handler(): void;
};

export const FirmwareDownloadButtonArea = createFC<Props>(
  ({ label, handler }) => {
    const onClick = () => {
      try {
        handler();
      } catch (error) {
        alert(error.message ?? error.toString());
      }
    };
    return (
      <Box padding="12px 10px">
        <Button onClick={onClick}>{label}</Button>
      </Box>
    );
  }
);
