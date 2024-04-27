import { css } from "@linaria/core";
import { LoginUser } from "@mx/web-kfx/app/base/types_dto_internal";
import { createFCX } from "@mx/web-kfx/app/common/fcx";
import { flexAligned } from "../../common_styling/utility_styles";

type Props = {
  user: LoginUser;
};

export const LoginUserBox = createFCX<Props>(
  ({ user }) => {
    return (
      <div>
        <img src={user.avatarUrl} alt="avatar" />
        <div>{user.userName}</div>
      </div>
    );
  },
  css`
    ${flexAligned(6)};
    > img {
      width: 24px;
    }
  `
);
