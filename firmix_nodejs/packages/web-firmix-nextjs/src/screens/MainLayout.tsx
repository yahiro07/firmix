"use client";
import { ReactNode } from "react";
import { Box, Flex, HStack, Spacer } from "../../styled-system/jsx";
import { createFCE } from "../common_styling/create_fce";
import { H1 } from "../common_styling/utility_components";
import { flexAligned } from "../common_styling/utility_styles";
import { IconIconifyZ } from "../components/IconIconifyZ";
import { SideBar } from "../features/layout/SideBar";
import { SiteVariationSelectionPart } from "../features/layout/SiteVariationSelectionPart";

const SiteTitle = createFCE(() => {
  return (
    <HStack gap="2px" color="var(--cl-top-bar-text)">
      <IconIconifyZ spec="mdi:chip" fontSize="44px" marginTop="3px" />
      <H1 css={flexAligned} gap={2}>
        <Box fontSize="36px" fontWeight="bold">
          Firmix
        </Box>
        <Box fontSize="28px" fontWeight="normal" marginTop="5px">
          (beta)
        </Box>
      </H1>
    </HStack>
  );
});

const TopBar = createFCE(() => (
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

const MainRow = createFCE<{ children: ReactNode }>(({ children }) => {
  return (
    <Flex>
      <SideBar
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

export const MainLayout = createFCE(({ children }: { children: ReactNode }) => {
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
});
