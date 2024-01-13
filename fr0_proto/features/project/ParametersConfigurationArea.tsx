import { css } from "~/aux/resin/resin_css.ts";
import { raiseError } from "~/aux/utils/error_util.ts";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import {
  ConfigurationEditItem,
  ConfigurationSourceItem,
  ConfigurationSourceItem_Valid,
} from "~/base/dto_types.ts";
import { pinNameToPinNumberMap_RP2040 } from "~/base/platform_definitions.ts";

type Props = {
  configurationSourceItems: ConfigurationSourceItem[];
  submitEditItems(editItems: ConfigurationEditItem[]): void;
  submitButtonLabel: string;
  submit2?(editItems: ConfigurationEditItem[]): void;
  submit2Label?: string;
};

export const ParametersConfigurationArea = createFC<Props>(
  (
    {
      configurationSourceItems: configurationSourceItemsRaw,
      submitEditItems,
      submitButtonLabel,
      submit2,
      submit2Label,
    },
  ) => {
    const hasError = configurationSourceItemsRaw.some((it) =>
      it.dataKind === "error"
    );
    const configurationSourceItems =
      configurationSourceItemsRaw as ConfigurationSourceItem_Valid[];

    const inputIdPrefix = `config-input-`;

    const handleDownload = (destFn: 1 | 2) => {
      try {
        const configurationEditItems: (ConfigurationEditItem)[] =
          configurationSourceItems.map(
            (sourceItem) => {
              const { key, label } = sourceItem;
              const inputElementId = `${inputIdPrefix}${key}`;
              const element = document.getElementById(
                inputElementId,
              ) as HTMLInputElement;
              if (!element) {
                raiseError(`target element not found for ${inputElementId}`);
              }
              const text = element.value;
              if (!text) {
                raiseError(
                  `${label}: 値を入力してください`,
                );
              }
              const values = text.split(",").map((it) => it.trim());
              if (sourceItem.dataKind === "pin") {
                if (values.length !== sourceItem.dataCount) {
                  const addNote = values.length === 1 &&
                    sourceItem.dataCount >= 2;
                  raiseError(
                    `${label}: ピンの数が定義と一致しません ${values.length}/${sourceItem.dataCount}${
                      addNote && " ピン名をコンマ区切りで入力してください"
                    }`,
                  );
                }
              }
              if (sourceItem.dataKind === "vl_pins") {
                if (values.length > sourceItem.maxPinCount) {
                  raiseError(
                    `${label}: ピンの数が多すぎます ${values.length}/${sourceItem.maxPinCount}`,
                  );
                }
              }

              if (sourceItem.dataKind === "pin") {
                for (const pinName of values) {
                  const pinNumber = pinNameToPinNumberMap_RP2040[pinName];
                  if (pinNumber === undefined) {
                    raiseError(
                      `${label}: ${pinName}はピンの名前として正しくありません。gp0,gp1などの形式で入力してください。`,
                    );
                  }
                }
              }
              return { key, values };
            },
          );
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
            カスタムデータの定義にエラーがあります
          </div>
        )}
        {!hasError && (
          <div>
            {configurationSourceItems.map((item) => (
              <div key={item.key}>
                <label>
                  {item.label} (gpio {item.dataKind === "pin"
                    ? `x ${item.dataCount}`
                    : `max ${item.maxPinCount}`})
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
  },
);

const style = css`
  border: solid 1px #888;
  padding: 10px;
  background: #fff;
`;
