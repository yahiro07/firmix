import { Box } from "@mui/system";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
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
