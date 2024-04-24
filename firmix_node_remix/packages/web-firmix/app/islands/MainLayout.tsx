import { Box, Flex, HStack, Spacer } from "@chakra-ui/react";
import { ReactNode } from "react";
import { SideBar } from "web-firmix/app/features/layout/SideBar";
import { createFCE2 } from "../common_styling/create_fce";
import { IconIconifyZ } from "../components/IconIconifyZ";
import { SiteVariationSelectionPart } from "../features/layout/SiteVariationSelectionPart";

const SiteTitle = createFCE2(() => {
  return (
    <HStack gap="2px" color="var(--cl-top-bar-text)">
      <IconIconifyZ spec="mdi:chip" fontSize="44px" marginTop="3px" />
      <HStack as="h1" gap={2}>
        <Box as="span" fontSize="36px" fontWeight="bold">
          Firmix
        </Box>
        <Box as="span" fontSize="28px" fontWeight="normal" marginTop="5px">
          (beta)
        </Box>
      </HStack>
    </HStack>
  );
});

const TopBar = createFCE2(() => (
  <HStack
    gap={0}
    padding="0 12px"
    height="60px"
    background="var(--cl-top-bar-fill)"
  >
    <SiteTitle />
    <Spacer />
    <SiteVariationSelectionPart siteVariant="base" />
  </HStack>
));

const MainRow = createFCE2<{ children: ReactNode }>(({ children }) => {
  return (
    <Flex>
      <SideBar
        q="side-bar"
        position="sticky"
        top="60px"
        height="calc(100vh - 60px)"
        flexShrink={0}
      />
      <Flex flexGrow={1} justifyContent="center">
        <Box flexGrow={1} maxWidth="800px">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
});

export const MainLayout = createFCE2(
  ({ children }: { children: ReactNode }) => {
    return (
      <Flex
        flexDirection="column"
        minHeight="100vh"
        background="var(--cl-page-background)"
        color="var(--cl-foreground-text)"
      >
        <TopBar
          position="sticky"
          width="100%"
          top={0}
          zIndex={100}
          flexShrink={0}
        />
        <MainRow flexGrow={1} children={children} />
      </Flex>
    );
  }
);
