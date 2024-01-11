import { css } from "~/aux/resin/resin_css.ts";

export const flexVertical = (gap?: number) =>
  css`
    display: flex;
    flex-direction: column;
    ${gap ? `gap: ${gap}px;` : ""}
  `;

export const flexHorizontal = (gap?: number) =>
  css`
    display: flex;
    ${gap ? `gap: ${gap}px;` : ""}
  `;

export const flexHorizontalAligned = (gap?: number) =>
  css`
    display: flex;
    align-items: center;
    ${gap ? `gap: ${gap}px;` : ""}
  `;

export const flexCentered = (gap?: number) =>
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    ${gap ? `gap: ${gap}px;` : ""}
  `;
