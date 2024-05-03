import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import {
  Center,
  HStack,
  StyledA,
} from "../../common_styling/utility_components";

const LinkButton = createFC<{ to: string; text: string; active: boolean }>(
  ({ to, text, active }) => (
    <StyledA href={to}>
      <Center
        bgcolor={active ? "#cea" : "#fff"}
        width="100px"
        padding="5px 6px"
        fontSize="1.1rem"
      >
        {text}
      </Center>
    </StyledA>
  )
);

export const SiteVariationSelectionPart = createFC<{
  siteVariant: "base" | "kfx";
}>(({ siteVariant }) => {
  const baseActive = siteVariant === "base";
  const kfxActive = siteVariant === "kfx";
  return (
    <HStack gap="6px">
      <LinkButton
        to="https://firmix.nector.me"
        text="Base"
        active={baseActive}
      />
      <LinkButton
        to="https://firmix-kfx.nector.me"
        text="KFX"
        active={kfxActive}
      />
    </HStack>
  );
});
