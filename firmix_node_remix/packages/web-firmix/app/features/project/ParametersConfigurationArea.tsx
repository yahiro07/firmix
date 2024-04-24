import { Button } from "@chakra-ui/react";
import { css } from "@linaria/core";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import {
  flexHorizontal,
  flexVertical,
} from "../../common_styling/utility_styles";

type Props = {
  submitEditItems(): void;
  submitButtonLabel: string;
};

export const ParametersConfigurationArea = createFC<Props>(
  ({ submitEditItems, submitButtonLabel }) => {
    const handleDownload = () => {
      try {
        submitEditItems();
      } catch (error) {
        alert(error.message ?? error.toString());
      }
    };
    return (
      <div q={style}>
        <div q="buttons-row">
          <Button onClick={() => handleDownload()}>{submitButtonLabel}</Button>
        </div>
      </div>
    );
  }
);

const style = css`
  padding: 10px;
  ${flexVertical(20)};
  > hr {
    margin-top: 20px;
  }
  > h3 {
    font-size: 1.3em;
  }
  > .items {
    ${flexVertical(12)};
    > .item {
      ${flexVertical()};
    }
  }
  > .buttons-row {
    margin-top: 8px;
    ${flexHorizontal(8)};
  }
`;
