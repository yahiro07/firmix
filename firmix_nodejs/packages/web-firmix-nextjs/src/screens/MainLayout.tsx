"use client";
import { Box } from "@mui/system";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { ReactNode } from "react";
import { createFCE } from "../common_styling/create_fce";
import { Flex, H1, HStack, Spacer } from "../common_styling/utility_components";
import { flexAligned } from "../common_styling/utility_styles";
import { IconIconifyZ } from "../components/IconIconifyZ";
import { SideBar } from "../features/layout/SideBar";
import { SiteVariationSelectionPart } from "../features/layout/SiteVariationSelectionPart";

const SiteTitle = createFCE(() => {
  return (
    <HStack gap="2px" color="var(--cl-top-bar-text)">
      <IconIconifyZ
        spec="mdi:chip"
        sx={{ fontSize: "44px", marginTop: "3px" }}
      />
      <H1 sx={flexAligned} gap="8px">
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
    bgcolor="var(--cl-top-bar-fill)"
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
        sx={{
          position: "sticky",
          top: "60px",
          height: "calc(100vh - 60px)",
          flexShrink: "0",
        }}
      />
      <Flex flexGrow={1} justifyContent="center">
        <Box flexGrow={1} maxWidth="800px">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
});

export const MainLayout = createFC(({ children }: { children: ReactNode }) => {
  return (
    <Flex
      flexDirection="column"
      minHeight="100vh"
      bgcolor="var(--cl-page-background)"
      color="var(--cl-foreground-text)"
    >
      <TopBar
        sx={{
          position: "sticky",
          width: "100%",
          top: 0,
          zIndex: 100,
          flexShrink: 0,
        }}
      />
      <MainRow sx={{ flexGrow: 1 }} children={children} />
    </Flex>
  );
});
