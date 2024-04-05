import { css } from "@acab/ecsstatic";
import { createFC } from "~/auxiliaries/utils_fe_react/create_fc";
import { LoginUser } from "~/base/types_dto_internal.ts";
import { flexAligned } from "~/common/utility_styles.ts";

type Props = {
  user: LoginUser;
};
export const LoginUserBox = createFC<Props>(({ user }) => {
  return (
    <div q={style}>
      <img src={user.avatarUrl} alt="avatar" />
      <div>{user.userName}</div>
    </div>
  );
});

const style = css`
  ${flexAligned(6)};
  > img {
    width: 24px;
  }
`;
