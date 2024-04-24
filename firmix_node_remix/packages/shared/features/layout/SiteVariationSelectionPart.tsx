import { Center, HStack } from "@chakra-ui/react";
import { createFCE2 } from "auxiliaries/utils_fe_react/create_fce";

const LinkButton = createFCE2<{ to: string; text: string; active: boolean }>(
  ({ to, text, active }) => (
    <Center
      as="a"
      href={to}
      background={active ? "#cea" : "#fff"}
      width="100px"
      padding="5px 6px"
      fontSize="1.1rem"
    >
      {text}
    </Center>
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
