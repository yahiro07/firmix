import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { SideBar } from "@mx/web-kfx/app/features/layout/SideBar";
import { ReactNode } from "react";
import { css } from "../../styled-system/css";
import { Box, Flex, HStack, Spacer } from "../../styled-system/jsx";
import { H1 } from "../common_styling/utility_components";
import { flexAligned } from "../common_styling/utility_styles";
import { IconIconifyZ } from "../components/IconIconifyZ";
import { SiteVariationSelectionPart } from "../features/layout/SiteVariationSelectionPart";

const SiteTitle = createFC(() => {
  return (
    <HStack gap="2px" color="var(--cl-top-bar-text)">
      <IconIconifyZ
        spec="mdi:chip"
        q={css({ fontSize: "44px", marginTop: "3px" })}
      />
      <H1 css={flexAligned} gap={2}>
        <Box fontSize="36px" fontWeight="bold">
          Firmix FKX
        </Box>
        <Box fontSize="28px" fontWeight="normal" marginTop="5px">
          (beta)
        </Box>
      </H1>
    </HStack>
  );
});

const TopBar = createFC(() => (
  <HStack
    gap={0}
    padding="0 12px"
    height="60px"
    background="var(--cl-top-bar-fill)"
  >
    <SiteTitle />
    <Spacer />
    <SiteVariationSelectionPart siteVariant="kfx" />
  </HStack>
));

const MainRow = createFC<{ children: ReactNode }>(({ children }) => {
  return (
    <Flex>
      <SideBar
        q={css({
          position: "sticky",
          top: "60px",
          height: "calc(100vh - 60px)",
          flexShrink: "0",
        })}
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
      background="var(--cl-page-background)"
      color="var(--cl-foreground-text)"
    >
      <TopBar
        q={css({
          position: "sticky",
          width: "100%",
          top: "0",
          zIndex: "100",
          flexShrink: "0",
        })}
      />
      <MainRow children={children} q={css({ flexGrow: 1 })} />
    </Flex>
  );
});
