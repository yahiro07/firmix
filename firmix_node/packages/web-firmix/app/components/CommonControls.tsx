import { reflectInputChecked } from "@mx/auxiliaries/utils_fe_react/form_helper";
import { Link } from "@remix-run/react";
import { Box, HStack, styled } from "../../styled-system/jsx";
import { createFCE } from "../common_styling/create_fce";
import { Input, Label, Li } from "../common_styling/utility_components";
import { IconIconifyZ } from "./IconIconifyZ";

export const Button = styled("button", {
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.6rem 1.2rem",
    fontWeight: "500",
    color: "#fff",
    backgroundColor: "#6366f1",
    whiteSpace: "noWrap",
    cursor: "pointer",
    "&:hover": { opacity: 0.8 },
    "&:disabled": { opacity: 0.3 },
  },
});

export const LinkButton = styled(Link, {
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.6rem 1.2rem",
    fontWeight: "500",
    color: "#fff",
    backgroundColor: "#6366f1",
    whiteSpace: "noWrap",
    "&:hover": { opacity: 0.8 },
    "&:disabled": { opacity: 0.3 },
  },
});

export const ButtonSmall = styled("button", {
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.9em",
    background: "#ddd",
    padding: "4px 10px",
    cursor: "pointer",
    "&:hover": { opacity: 0.8 },
    "&:disabled": { opacity: 0.3 },
  },
});

// export const Card: FC<BoxProps> = (props) => (
//   <Box {...props} background="#fff" boxShadow="0 2px 2px #0004" />
// );

// export const Card = prefab(
//   <Box background="#fff" boxShadow="0 2px 2px #0004" />
// );

export const Card = styled("div", {
  base: {
    background: "#fff",
    boxShadow: "0 2px 2px #0004",
  },
});

export const FormLabel = styled("label");

export const FormTextInput = styled("input", {
  base: {
    padding: "0.625rem",
    borderWidth: "1px",
    borderColor: "#d1d5db",
    color: "#111827",
    backgroundColor: "#f9fafb",
  },
});

export const Nav = styled("ul", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
});

const NavItemCore = createFCE<{
  title: string;
  iconSpec: string;
  active?: boolean;
}>(({ title, iconSpec, active }) => (
  <HStack
    gap="2"
    fontSize="20px"
    cursor="pointer"
    fontWeight={(active && "500") || "normal"}
    _hover={{ opacity: 0.7 }}
  >
    <IconIconifyZ spec={iconSpec as any} fontSize="24px" />
    <span>{title}</span>
  </HStack>
));

export const NavItem = createFCE<{
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
      <Link to={path}>
        <NavItemCore title={title} iconSpec={iconSpec} active={active} />
      </Link>
    </Li>
  );
});

export const NavItem_Button = createFCE<{
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

export const ToggleButtonLarge = createFCE(
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
        cursor="pointer"
        display="flex"
        alignItems="center"
        gap="8px"
      >
        <Input
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
          background={checked ? "#7ca" : "#ccc"}
          borderRadius="99px"
          transition="background 0.5s"
        >
          <Box
            position="absolute"
            top="2px"
            left={checked ? "32px" : "2px"}
            width="26px"
            height="26px"
            background="#fff"
            borderRadius="99px"
            transition="left 0.5s"
          />
        </Box>
        <span>{text}</span>
      </Label>
    );
  }
);
