import { css } from "@linaria/core";
import { createFCX } from "auxiliaries/utils_fe_react/fcx";
import { flexAligned } from "shared/common/utility_styles";
import { LoginUser } from "web-firmix/app/base/types_dto_internal";

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
