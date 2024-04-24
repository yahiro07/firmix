import { HStack, Img } from "@chakra-ui/react";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import { LoginUser } from "web-firmix/app/base/types_dto_internal";

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
