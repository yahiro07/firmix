import { css } from "resin";
import { createFC } from "~/auxiliaries/utils_fe/create_fc.ts";
import { LoginUser } from "~/base/types_dto_internal.ts";
import { flexHorizontalAligned } from "~/common/utility_styles.ts";

type Props = {
  user: LoginUser;
};
export const LoginUserBox = createFC<Props>(({ user }) => {
  return (
    <div q={style}>
      <img src={user.avatarUrl} />
      <div>{user.userName}</div>
    </div>
  );
});

const style = css`
  ${flexHorizontalAligned(6)};
  > img {
    width: 24px;
  }
`;
