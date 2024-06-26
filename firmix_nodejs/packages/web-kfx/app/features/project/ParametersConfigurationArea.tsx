import { raiseError } from "@mx/auxiliaries/utils/error_util";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import {
  ConfigurationSourceItem,
  ConfigurationSourceItemWrapper,
  ConfigurationSourceItem_Error,
} from "@mx/web-kfx/app/base/types_dto";
import { ConfigurationEditItem } from "@mx/web-kfx/app/base/types_project_edit";
import { firmixCore_firmwareConfiguration } from "@mx/web-kfx/app/cardinal/firmix_core_firmware_configuration/mod";
import { Box, HStack, Stack } from "../../../styled-system/jsx";
import { H3, Hr } from "../../common_styling/utility_components";
import {
  Button,
  FormLabel,
  FormTextInput,
} from "../../components/CommonControls";

type Props = {
  configurationSourceItems: ConfigurationSourceItemWrapper[];
  submitEditItems(editItems: ConfigurationEditItem[]): void;
  submitButtonLabel: string;
  submit2?(editItems: ConfigurationEditItem[]): void;
  submit2Label?: string;
  pinNumbersMap: Record<string, number>;
  boardLabel: string;
};

export const ParametersConfigurationArea = createFC<Props>(
  ({
    configurationSourceItems: configurationSourceItemsRaw,
    submitEditItems,
    submitButtonLabel,
    submit2,
    submit2Label,
    pinNumbersMap,
    boardLabel,
  }) => {
    const errorConfigurations = configurationSourceItemsRaw.filter(
      (it) => it.dataKind === "error"
    ) as ConfigurationSourceItem_Error[];

    const hasError = errorConfigurations.length > 0;
    const configurationSourceItems =
      configurationSourceItemsRaw as ConfigurationSourceItem[];

    const inputIdPrefix = `config-input-`;

    const handleDownload = (destFn: 1 | 2) => {
      try {
        const configurationEditItems: ConfigurationEditItem[] =
          configurationSourceItems.map((sourceItem) => {
            const { key } = sourceItem;
            const inputElementId = `${inputIdPrefix}${key}`;
            const element = document.getElementById(
              inputElementId
            ) as HTMLInputElement;
            if (!element) {
              raiseError(`target element not found for ${inputElementId}`);
            }
            const text = element.value;
            const values =
              firmixCore_firmwareConfiguration.splitSourceItemEditTextValues(
                sourceItem,
                text,
                pinNumbersMap
              );
            return { key, values };
          });
        if (destFn === 1) {
          submitEditItems(configurationEditItems);
        } else {
          submit2?.(configurationEditItems);
        }
      } catch (error) {
        alert(error.message ?? error.toString());
      }
    };

    return (
      <Stack padding="10px" gap="20px">
        <Hr if={configurationSourceItems.length > 0} marginTop="20px" />
        <H3 if={configurationSourceItems.length > 0} fontSize="1.3em">
          パラメータ
        </H3>
        {hasError && (
          <div>
            <div>カスタムデータの定義にエラーがあります</div>
            <div>
              {errorConfigurations.map((item) => (
                <div key={item.key}>
                  {item.key}: {item.message}
                </div>
              ))}
            </div>
          </div>
        )}
        {!hasError && (
          <Stack gap="12px">
            {configurationSourceItems.map((item) => (
              <Stack key={item.key}>
                <FormLabel>
                  {item.label}
                  {local.configurationSourceItem_getCountsText(item)}
                </FormLabel>
                <FormTextInput type="text" id={`${inputIdPrefix}${item.key}`} />
              </Stack>
            ))}
          </Stack>
        )}
        <Stack gap="12px">
          <HStack if={boardLabel}>
            <span>ボード:&nbsp;</span>
            <Box fontWeight="bold">{boardLabel}</Box>
          </HStack>
          <HStack gap="8px">
            <Button onClick={() => handleDownload(2)} if={!hasError && submit2}>
              {submit2Label}
            </Button>
            <Button onClick={() => handleDownload(1)} if={!hasError}>
              {submitButtonLabel}
            </Button>
          </HStack>
        </Stack>
      </Stack>
    );
  }
);

const local = {
  configurationSourceItem_getCountsText(item: ConfigurationSourceItem): string {
    const { dataKind, required } = item;
    const reqMark = required ? "*" : "";
    if (dataKind === "pins") {
      return `(gpio x${item.pinsCount})` + reqMark;
    } else if (dataKind === "vl_pins") {
      return `(gpio max${item.pinsCapacity})` + reqMark;
    } else if (dataKind === "text") {
      return `(${item.textLength}文字)` + reqMark;
    } else if (dataKind === "vl_text") {
      return `(最大 ${item.textCapacity}文字)` + reqMark;
    } else if (dataKind === "i8" || dataKind === "u8") {
      if (item.dataCount === 1) return "" + reqMark;
      return `(x${item.dataCount})` + reqMark;
    } else {
      raiseError(`invalid dataKind ${dataKind}`);
    }
  },
};
