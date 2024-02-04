import { css } from "resin";
import { raiseError } from "~/aux/utils/error_util.ts";
import { createFC } from "~/aux/utils_fe/create_fc.ts";

import {
  ConfigurationSourceItem,
  ConfigurationSourceItemWrapper,
  ConfigurationSourceItem_Error,
} from "~/base/types_dto.ts";
import { ConfigurationEditItem } from "~/base/types_project_edit.ts";
import { firmixCore_firmwareConfiguration } from "~/cardinal/firmix_core_firmware_configuration/mod.ts";
import { flexHorizontal, flexVertical } from "~/common/utility_styles.ts";
import {
  Button,
  FormLabel,
  FormTextInput,
} from "~/components/CommonControls.tsx";

type Props = {
  configurationSourceItems: ConfigurationSourceItemWrapper[];
  submitEditItems(editItems: ConfigurationEditItem[]): void;
  submitButtonLabel: string;
  submit2?(editItems: ConfigurationEditItem[]): void;
  submit2Label?: string;
};

export const ParametersConfigurationArea = createFC<Props>(
  ({
    configurationSourceItems: configurationSourceItemsRaw,
    submitEditItems,
    submitButtonLabel,
    submit2,
    submit2Label,
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
                text
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
      <div q={style}>
        {hasError && (
          <div>
            <div>カスタムデータの定義にエラーがあります</div>
            <div>
              {errorConfigurations.map((item) => (
                <div>
                  {item.key}: {item.message}
                </div>
              ))}
            </div>
          </div>
        )}
        {!hasError && (
          <div q="items">
            {configurationSourceItems.map((item) => (
              <div key={item.key} q="item">
                <FormLabel>
                  {item.label}
                  {local.configurationSourceItem_getCountsText(item)}
                </FormLabel>
                <FormTextInput type="text" id={`${inputIdPrefix}${item.key}`} />
                <span if={false}>{item.instruction}</span>
              </div>
            ))}
          </div>
        )}
        <div q="buttons-row">
          <Button onClick={() => handleDownload(2)} if={!hasError && submit2}>
            {submit2Label}
          </Button>
          <Button onClick={() => handleDownload(1)} if={!hasError}>
            {submitButtonLabel}
          </Button>
        </div>
      </div>
    );
  }
);

const style = css`
  padding: 10px;
  ${flexVertical(20)};
  > .items {
    ${flexVertical(12)};
    > .item {
      ${flexVertical()};
    }
  }
  > .buttons-row {
    ${flexHorizontal(8)};
  }
`;

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
