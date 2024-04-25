import { css } from "@linaria/core";
import { createFCX } from "@mx/auxiliaries/utils_fe_react/fcx";
import { flexAligned, flexCentered } from "../../common_styling/utility_styles";

export const SiteVariationSelectionPart = createFCX<{
  siteVariant: "base" | "kfx";
}>(
  ({ siteVariant }) => {
    const baseActive = siteVariant === "base";
    const kfxActive = siteVariant === "kfx";
    return (
      <div>
        <a href="https://firmix.nector.me" q={baseActive && "--active"}>
          Base
        </a>
        <a href="https://firmix-kfx.nector.me" q={kfxActive && "--active"}>
          KFX
        </a>
      </div>
    );
  },
  css`
    ${flexAligned(6)};
    > a {
      background: #fff;
      width: 100px;
      padding: 5px 6px;
      ${flexCentered()};
      font-size: 1.1rem;

      &.--active {
        background: #cea;
      }
    }
  `
);
