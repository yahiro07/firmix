import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { reflectInputChecked } from "@mx/auxiliaries/utils_fe_react/form_helper";
import Link from "next/link";

import { Box, BoxProps, styled } from "@mui/system";
import { ComponentProps, FC } from "react";
import { prefab } from "../common_styling/prefab";
import { HStack, Label, Li } from "../common_styling/utility_components";
import { IconIconifyZ } from "./IconIconifyZ";

export const Button = prefab<JSX.IntrinsicElements["button"]>(
  <Box
    component="button"
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0.6rem 1.2rem",
      fontWeight: "500",
      color: "#fff",
      backgroundColor: "#6366f1",
      border: "none",
      whiteSpace: "noWrap",
      cursor: "pointer",
      "&:hover": { opacity: 0.8 },
      "&:disabled": { opacity: 0.3 },
    }}
  />
);

export const LinkButton: FC<BoxProps & ComponentProps<typeof Link>> = (
  props
) => (
  <Box
    component={Link}
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0.6rem 1.2rem",
      fontWeight: "500",
      color: "#fff",
      backgroundColor: "#6366f1",
      border: "none",
      whiteSpace: "noWrap",
      "&:hover": { opacity: 0.8 },
      "&:disabled": { opacity: 0.3 },
    }}
    {...props}
  />
);

export const ButtonSmall = prefab<JSX.IntrinsicElements["button"]>(
  <Box
    component="button"
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "0.9em",
      background: "#ddd",
      border: "none",
      padding: "4px 10px",
      cursor: "pointer",
      "&:hover": { opacity: 0.8 },
      "&:disabled": { opacity: 0.3 },
    }}
  />
);

export const Card = prefab(<Box bgcolor="#fff" boxShadow="0 2px 2px #0004" />);

export const FormLabel = styled("label")``;

export const FormTextInput = prefab(
  <Box
    component="input"
    sx={{
      padding: "0.625rem",
      borderWidth: "1px",
      borderColor: "#d1d5db",
      color: "#111827",
      backgroundColor: "#f9fafb",
    }}
  />
);

export const Nav = prefab(
  <Box
    component="ul"
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}
  />
);

const NavItemCore = createFC<{
  title: string;
  iconSpec: string;
  active?: boolean;
  onClick?(): void;
}>(({ title, iconSpec, active, onClick }) => (
  <HStack
    gap="8px"
    fontSize="20px"
    fontWeight={(active && "500") || "normal"}
    sx={{ cursor: "pointer", "&:hover": { opacity: 0.7 } }}
    onClick={onClick}
  >
    <IconIconifyZ spec={iconSpec as any} sx={{ fontSize: "24px" }} />
    <span>{title}</span>
  </HStack>
));

export const NavItem = createFC<{
  path: string;
  title: string;
  iconSpec: string;
}>(({ path, title, iconSpec }) => {
  // const { pagePath } = useSiteContext();
  // const active = path === pagePath;
  // const active = path === location.href;
  const active = false;
  return (
    <Li>
      <Link href={path}>
        <NavItemCore title={title} iconSpec={iconSpec} active={active} />
      </Link>
    </Li>
  );
});

export const NavItem_Button = createFC<{
  path: string;
  title: string;
  iconSpec: string;
}>(({ path, title, iconSpec }) => {
  const onClick = () => {
    console.log("onClick", path);
    location.href = path;
  };
  return (
    <Li>
      <NavItemCore title={title} iconSpec={iconSpec} onClick={onClick} />
    </Li>
  );
});

export const ToggleButtonLarge = createFC(
  ({
    checked,
    setChecked,
    text,
  }: {
    checked: boolean;
    setChecked(): void;
    text: string;
  }) => {
    return (
      <Label
        position="relative"
        display="flex"
        alignItems="center"
        gap="8px"
        sx={{ cursor: "pointer" }}
      >
        <Box
          component="input"
          type="checkbox"
          value=""
          checked={checked}
          onChange={reflectInputChecked(setChecked)}
          position="absolute"
          width="1px"
          height="1px"
        />
        <Box
          position="relative"
          width="60px"
          height="30px"
          borderRadius="99px"
          bgcolor={checked ? "#7ca" : "#ccc"}
          sx={{
            transition: "background 0.5s",
          }}
        >
          <Box
            position="absolute"
            top="2px"
            left={checked ? "32px" : "2px"}
            width="26px"
            height="26px"
            borderRadius="99px"
            bgcolor="#fff"
            sx={{
              transition: "left 0.5s",
            }}
          />
        </Box>
        <span>{text}</span>
      </Label>
    );
  }
);
