import { createFC } from "~/auxiliaries/utils_fe_react/create_fc";

export const iconShapes = {
  "lucide:package": (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="m7.5 4.27l9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7l8.7 5l8.7-5M12 22V12" />
      </g>
    </svg>
  ),
  "mdi:chip": (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M6 4h12v1h3v2h-3v2h3v2h-3v2h3v2h-3v2h3v2h-3v1H6v-1H3v-2h3v-2H3v-2h3v-2H3V9h3V7H3V5h3zm5 11v3h1v-3zm2 0v3h1v-3zm2 0v3h1v-3z"
      />
    </svg>
  ),
  "ph:toolbox": (
    <svg width="1em" height="1em" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M224 64h-48v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H32a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16M96 56a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm128 24v32h-32v-8a8 8 0 0 0-16 0v8H80v-8a8 8 0 0 0-16 0v8H32V80Zm0 112H32v-64h32v8a8 8 0 0 0 16 0v-8h96v8a8 8 0 0 0 16 0v-8h32z"
      />
    </svg>
  ),
  "grommet-icons:personal-computer": (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M3 18h18V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1zm-1 2h20c1 0 1-1 1-1H1s0 1 1 1Z"
      />
    </svg>
  ),
  "material-symbols:settings": (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.013 2.475T12.05 15.5"
      />
    </svg>
  ),
  "carbon:debug": (
    <svg width="1em" height="1em" viewBox="0 0 32 32">
      <path
        fill="currentColor"
        d="m29.83 20l.34-2l-5.17-.85v-4.38l5.06-1.36l-.51-1.93l-4.83 1.29A9 9 0 0 0 20 5V2h-2v2.23a8.81 8.81 0 0 0-4 0V2h-2v3a9 9 0 0 0-4.71 5.82L2.46 9.48L2 11.41l5 1.36v4.38L1.84 18l.32 2L7 19.18a8.9 8.9 0 0 0 .82 3.57l-4.53 4.54l1.42 1.42l4.19-4.2a9 9 0 0 0 14.2 0l4.19 4.2l1.42-1.42l-4.54-4.54a8.9 8.9 0 0 0 .83-3.57ZM15 25.92A7 7 0 0 1 9 19v-6h6ZM9.29 11a7 7 0 0 1 13.42 0ZM23 19a7 7 0 0 1-6 6.92V13h6Z"
      />
    </svg>
  ),
  "material-symbols:login": (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"
      />
    </svg>
  ),
  "material-symbols:logout": (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
      />
    </svg>
  ),
  "ph:files": (
    <svg width="1em" height="1em" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="m213.66 66.34l-40-40A8 8 0 0 0 168 24H88a16 16 0 0 0-16 16v16H56a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h112a16 16 0 0 0 16-16v-16h16a16 16 0 0 0 16-16V72a8 8 0 0 0-2.34-5.66M168 216H56V72h76.69L168 107.31v84.85zm32-32h-16v-80a8 8 0 0 0-2.34-5.66l-40-40A8 8 0 0 0 136 56H88V40h76.69L200 75.31Zm-56-32a8 8 0 0 1-8 8H88a8 8 0 0 1 0-16h48a8 8 0 0 1 8 8m0 32a8 8 0 0 1-8 8H88a8 8 0 0 1 0-16h48a8 8 0 0 1 8 8"
      />
    </svg>
  ),
  "mdi:folder": (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M10 4H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8z"
      />
    </svg>
  ),
  "ph:folder-thin": (
    <svg width="1em" height="1em" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M216 76h-86.34l-28.49-28.48A11.9 11.9 0 0 0 92.69 44H40a12 12 0 0 0-12 12v144.62A11.4 11.4 0 0 0 39.38 212h177.51A11.12 11.12 0 0 0 228 200.89V88a12 12 0 0 0-12-12M36 56a4 4 0 0 1 4-4h52.69a4 4 0 0 1 2.82 1.17L118.34 76H36Zm184 144.89a3.12 3.12 0 0 1-3.11 3.11H39.38a3.39 3.39 0 0 1-3.38-3.38V84h180a4 4 0 0 1 4 4Z"
      />
    </svg>
  ),
  "icon-park-twotone:chip": (
    <svg width="1em" height="1em" viewBox="0 0 48 48">
      <defs>
        <mask id="ipTChip0">
          <g fill="none" stroke="#fff" strokeWidth="4">
            <rect width="24" height="36" x="12" y="6" fill="#555" rx="2" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 12H6m6 8H6m6 8H6m6 8H6m36-24h-6m6 8h-6m6 8h-6m6 8h-6"
            />
          </g>
        </mask>
      </defs>
      <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTChip0)" />
    </svg>
  ),
  "mdi:github": (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
      />
    </svg>
  ),
  "mdi:edit": (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
      />
    </svg>
  ),
  "fa-solid:eye": (
    <svg width="1.13em" height="1em" viewBox="0 0 576 512">
      <path
        fill="currentColor"
        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19M288 400a144 144 0 1 1 144-144a143.93 143.93 0 0 1-144 144m0-240a95.31 95.31 0 0 0-25.31 3.79a47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160"
      />
    </svg>
  ),
  "fa-solid:eye-slash": (
    <svg width="1.25em" height="1em" viewBox="0 0 640 512">
      <path
        fill="currentColor"
        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61m313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07a32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45m-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
      />
    </svg>
  ),
  "mdi:check": (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z"
      />
    </svg>
  ),
  "mdi:warning-outline": (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 2L1 21h22M12 6l7.53 13H4.47M11 10v4h2v-4m-2 6v2h2v-2"
      />
    </svg>
  ),
  "subway:error": (
    <svg width="1em" height="1em" viewBox="0 0 512 512">
      <path
        fill="currentColor"
        d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0M64 256c0-106.1 86-192 192-192c42.1 0 81 13.7 112.6 36.7L100.7 368.6C77.7 337 64 298.1 64 256m192 192c-42.1 0-81-13.7-112.6-36.7l267.9-267.9c23 31.7 36.7 70.5 36.7 112.6c0 106.1-86 192-192 192"
      />
    </svg>
  ),
};

const iconShape_missingFallback = (
  <svg width="1em" height="1em" viewBox="0 0 48 48">
    <path fill="#42A5F5" d="M36 44H8V8h20l8 8z" />
    <path fill="#90CAF9" d="M40 40H12V4h20l8 8z" />
    <path fill="#E1F5FE" d="M38.5 13H31V5.5z" />
    <path
      fill="#1976D2"
      d="M24.5 28.3c0-4.7 3.6-4.4 3.6-7.2c0-.7-.2-2.1-2-2.1c-2 0-2.1 1.6-2.1 2h-2.7c0-.7.3-4.2 4.8-4.2c4.6 0 4.7 3.6 4.7 4.3c0 3.5-3.8 4-3.8 7.3h-2.5zm-.2 3.5c0-.2 0-1.5 1.5-1.5c1.4 0 1.5 1.3 1.5 1.5c0 .4-.2 1.4-1.5 1.4s-1.5-1-1.5-1.4"
    />
  </svg>
);

type IconSpec = keyof typeof iconShapes;

export const IconIconifyZ = createFC<{ spec: IconSpec }>(({ spec }) => {
  const el = iconShapes[spec] ?? iconShape_missingFallback;
  return {
    ...el,
    props: { ...el.props, xmlns: `http://www.w3.org/2000/svg` },
  };
});
