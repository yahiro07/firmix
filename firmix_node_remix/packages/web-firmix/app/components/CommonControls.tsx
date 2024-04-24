/* eslint-disable @typescript-eslint/no-unused-vars */
import { chakra } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Link } from "@remix-run/react";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import { createFCS } from "auxiliaries/utils_fe_react/fcs";
import { reflectInputChecked } from "auxiliaries/utils_fe_react/form_helper";
import { flexAligned, flexVertical } from "../common_styling/utility_styles";
import { IconIconifyZ } from "./IconIconifyZ";

export const Button = chakra("button", {
  baseStyle: {
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

export const LinkButton = chakra(Link, {
  baseStyle: {
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

export const ButtonSmall = chakra("button", {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.9em",
    background: "#ddd",
    padding: "4px 10px",
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

export const Card = chakra(styled.div`
  background: #fff;
  box-shadow: 0 2px 2px #0004;
`);

export const FormLabel = chakra(styled.label``);

export const FormTextInput = chakra(styled.input`
  padding: 0.625rem;
  border-width: 1px;
  border-color: #d1d5db;
  color: #111827;
  background-color: #f9fafb;
`);

export const Nav = chakra(styled.ul`
  ${flexVertical(16)};
`);

const StyledNavItem = styled("div")`
  font-size: 20px;
  ${flexAligned(8)};
  cursor: pointer;
  > .icon {
    font-size: 24px;
  }
  &[data-current] {
    font-weight: 500;
  }
  &:hover {
    opacity: 0.7;
  }
`;

const StyledNavLink = styled(Link)`
  font-size: 20px;
  ${flexAligned(8)};
  cursor: pointer;
  > .icon {
    font-size: 24px;
  }
  &[data-current] {
    font-weight: 500;
  }
  &:hover {
    opacity: 0.7;
  }
`;

export const NavItem = chakra(
  createFC<{
    path: string;
    title: string;
    iconSpec: string;
  }>(({ path, title, iconSpec }) => {
    // const { pagePath } = useSiteContext();
    // const active = path === pagePath;
    // const active = path === location.href;
    const active = false;
    return (
      <li q={["nav-item", active && "active"]}>
        <StyledNavLink to={path}>
          <IconIconifyZ spec={iconSpec as any} q="icon" />
          <span>{title}</span>
        </StyledNavLink>
      </li>
    );
  })
);

export const NavItem_Button = chakra(
  createFC<{
    path: string;
    title: string;
    iconSpec: string;
  }>(({ path, title, iconSpec }) => {
    const onClick = () => (location.href = path);
    return (
      <li>
        <StyledNavItem onClick={onClick}>
          <IconIconifyZ spec={iconSpec as any} q="icon" />
          <span>{title}</span>
        </StyledNavItem>
      </li>
    );
  })
);

export const ToggleButtonLarge = chakra(
  createFCS(
    (
      {
        checked,
        setChecked,
        text,
      }: {
        checked: boolean;
        setChecked(): void;
        text: string;
      },
      { Base }
    ) => {
      return (
        <Base>
          <input
            type="checkbox"
            value=""
            checked={checked}
            onChange={reflectInputChecked(setChecked)}
          />
          <div />
          <span>{text}</span>
        </Base>
      );
    },
    {
      Base: styled.label`
        position: relative;
        cursor: pointer;
        ${flexAligned(8)};

        > input {
          position: absolute;
          width: 1px;
          height: 1px;
        }

        > div {
          position: relative;
          width: 60px;
          height: 30px;
          background: #ccc;
          border-radius: 99px;

          &:before {
            position: absolute;
            top: 2px;
            left: 2px;
            content: "";
            width: 26px;
            height: 26px;
            background: #fff;
            border-radius: 99px;
            transition: left 0.5s;
          }
        }

        > input:checked + div {
          background-color: #7ca;
          &:before {
            left: 32px;
          }
        }
      `,
    }
  )
);
