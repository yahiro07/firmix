export const flexVertical = (gap?: number) =>
  `
    display: flex;
    flex-direction: column;
    ${gap ? `gap: ${gap}px;` : ""}
  `;

export const flexHorizontal = (gap?: number) =>
  `
    display: flex;
    ${gap ? `gap: ${gap}px;` : ""}
  `;

export const flexAligned = (gap?: number) =>
  `
    display: flex;
    align-items: center;
    ${gap ? `gap: ${gap}px;` : ""}
  `;

export const flexCentered = (gap?: number) =>
  `
    display: flex;
    justify-content: center;
    align-items: center;
    ${gap ? `gap: ${gap}px;` : ""}
  `;
