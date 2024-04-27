import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { HStack } from "../../../styled-system/jsx";
import { LoginUser } from "../../base/types_dto_internal";
import { Img } from "../../common_styling/utility_components";

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
