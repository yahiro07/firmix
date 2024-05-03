import { Box } from "@mui/system";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { HStack, VStack } from "../../common_styling/utility_components";
import { Button } from "../../components/CommonControls";

type Props = {
  buttonLabel: string;
  boardLabel: string;
  handler(): void;
};

export const FirmwareDownloadButtonArea = createFC<Props>(
  ({ buttonLabel, boardLabel, handler }) => {
    const onClick = () => {
      try {
        handler();
      } catch (error) {
        alert(error.message ?? error.toString());
      }
    };
    return (
      <VStack padding="12px 10px" gap="8px">
        <HStack if={boardLabel}>
          <span>ボード:&nbsp;</span>
          <Box fontWeight="bold">{boardLabel}</Box>
        </HStack>
        <Box>
          <Button onClick={onClick}>{buttonLabel}</Button>
        </Box>
      </VStack>
    );
  }
);
