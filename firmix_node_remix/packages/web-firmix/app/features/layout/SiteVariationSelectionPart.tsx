import { Center, HStack } from "../../../styled-system/jsx";
import { createFCE2 } from "../../common_styling/create_fce";
import { StyledA } from "../../common_styling/utility_components";

const LinkButton = createFCE2<{ to: string; text: string; active: boolean }>(
  ({ to, text, active }) => (
    <StyledA href={to}>
      <Center
        background={active ? "#cea" : "#fff"}
        width="100px"
        padding="5px 6px"
        fontSize="1.1rem"
      >
        {text}
      </Center>
    </StyledA>
  )
);

export const SiteVariationSelectionPart = createFCE2<{
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
