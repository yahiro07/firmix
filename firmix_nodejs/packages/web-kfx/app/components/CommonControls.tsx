/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { reflectInputChecked } from "@mx/auxiliaries/utils_fe_react/form_helper";
import { createFCX } from "@mx/web-kfx/app/common/fcx";
import { Link } from "@remix-run/react";
import { flexAligned, flexVertical } from "../common_styling/utility_styles";
import { IconIconifyZ } from "./IconIconifyZ";

export const Button = styled.button`
  padding: 0.5rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #6366f1;
  border: none;

  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.3;
  }
`;

export const LinkButton = styled(Link)`
  padding: 0.5rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #6366f1;
  border: none;

  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.3;
  }
`;

export const ButtonSmall = styled.button``;

export const Card = styled.div`
  background: #fff;
  box-shadow: 0 2px 2px #0004;
`;

export const FormLabel = styled.label``;

export const FormTextInput = styled.input`
  padding: 0.625rem;
  border-width: 1px;
  border-color: #d1d5db;
  color: #111827;
  background-color: #f9fafb;
`;

export const Nav = styled.ul`
  ${flexVertical(16)};
`;

const styleNavItem = css`
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

export const NavItem = createFCX<{
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
      <Link to={path} q={styleNavItem}>
        <IconIconifyZ spec={iconSpec as any} q="icon" />
        <span>{title}</span>
      </Link>
    </li>
  );
});

export const NavItem_Button = createFCX<{
  path: string;
  title: string;
  iconSpec: string;
}>(({ path, title, iconSpec }) => {
  const onClick = () => (location.href = path);
  return (
    <li>
      <div q={styleNavItem} onClick={onClick}>
        <IconIconifyZ spec={iconSpec as any} q="icon" />
        <span>{title}</span>
      </div>
    </li>
  );
});

export const ToggleButtonLarge = createFCX<{
  checked: boolean;
  setChecked(): void;
  text: string;
}>(
  ({ checked, setChecked, text }) => {
    return (
      <label>
        <input
          type="checkbox"
          value=""
          checked={checked}
          onChange={reflectInputChecked(setChecked)}
        />
        <div />
        <span>{text}</span>
      </label>
    );
  },
  css`
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
  `
);
