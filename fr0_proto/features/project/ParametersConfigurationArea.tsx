import { css } from "resin";
import { raiseError } from "~/aux/utils/error_util.ts";
import { createFC } from "~/aux/utils_fe/create_fc.ts";

import {
  ConfigurationSourceItem,
  ConfigurationSourceItemWrapper,
} from "~/base/types_dto.ts";
import { ConfigurationEditItem } from "~/base/types_project_edit.ts";
import { firmixCore_firmwareConfiguration } from "~/cathedral/firmix_core_firmware_configuration/mod.ts";

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
    const hasError = configurationSourceItemsRaw.some(
      (it) => it.dataKind === "error"
    );
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
        {hasError && <div>カスタムデータの定義にエラーがあります</div>}
        {!hasError && (
          <div>
            {configurationSourceItems.map((item) => (
              <div key={item.key}>
                <label>
                  {item.label}
                  {local.configurationSourceItem_getCountsText(item)}
                </label>
                <input id={`${inputIdPrefix}${item.key}`} />
                <span>{item.instruction}</span>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => handleDownload(2)}
          disabled={hasError}
          if={submit2}
        >
          {submit2Label}
        </button>
        <button onClick={() => handleDownload(1)} disabled={hasError}>
          {submitButtonLabel}
        </button>
      </div>
    );
  }
);

const style = css`
  border: solid 1px #888;
  padding: 10px;
  background: #fff;
`;

const local = {
  configurationSourceItem_getCountsText(item: ConfigurationSourceItem): string {
    if (item.dataKind === "pins") {
      return `(gpio x${item.pinCount})`;
    } else if (item.dataKind === "vl_pins") {
      return `(gpio max${item.pinsCapacity})`;
    } else {
      if (item.dataCount === 1) return "";
      return `(x${item.dataCount})`;
    }
  },
};
