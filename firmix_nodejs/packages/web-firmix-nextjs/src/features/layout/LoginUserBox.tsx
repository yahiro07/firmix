import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { LoginUser } from "../../base/types_dto_internal";
import { HStack, Img } from "../../common_styling/utility_components";

type Props = {
  user: LoginUser;
};

export const LoginUserBox = createFC<Props>(({ user }) => {
  return (
    <HStack gap="6px">
      <Img src={user.avatarUrl} alt="avatar" width="24px" />
      <div>{user.userName}</div>
    </HStack>
  );
});
