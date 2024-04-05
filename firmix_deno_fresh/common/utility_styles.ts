import { css } from "resin";
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

export const flexAligned = (gap?: number) =>
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
