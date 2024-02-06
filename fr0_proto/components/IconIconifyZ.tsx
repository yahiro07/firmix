import { createFC } from "~/auxiliaries/utils_fe/create_fc.ts";

export const iconShapes = {
  "lucide:package": (
    <svg viewBox="0 0 24 24">
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path d="m7.5 4.27l9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7l8.7 5l8.7-5M12 22V12" />
      </g>
    </svg>
  ),
  "mdi:chip": (
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M6 4h12v1h3v2h-3v2h3v2h-3v2h3v2h-3v2h3v2h-3v1H6v-1H3v-2h3v-2H3v-2h3v-2H3V9h3V7H3V5h3zm5 11v3h1v-3zm2 0v3h1v-3zm2 0v3h1v-3z"
      />
    </svg>
  ),
  "ph:toolbox": (
    <svg viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M224 64h-48v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H32a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16M96 56a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm128 24v32h-32v-8a8 8 0 0 0-16 0v8H80v-8a8 8 0 0 0-16 0v8H32V80Zm0 112H32v-64h32v8a8 8 0 0 0 16 0v-8h96v8a8 8 0 0 0 16 0v-8h32z"
      />
    </svg>
  ),
  "grommet-icons:personal-computer": (
    <svg viewBox="0 0 24 24">
      <path
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        d="M3 18h18V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1zm-1 2h20c1 0 1-1 1-1H1s0 1 1 1Z"
      />
    </svg>
  ),
  "material-symbols:settings": (
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.013 2.475T12.05 15.5"
      />
    </svg>
  ),
  "carbon:debug": (
    <svg viewBox="0 0 32 32">
      <path
        fill="currentColor"
        d="m29.83 20l.34-2l-5.17-.85v-4.38l5.06-1.36l-.51-1.93l-4.83 1.29A9 9 0 0 0 20 5V2h-2v2.23a8.81 8.81 0 0 0-4 0V2h-2v3a9 9 0 0 0-4.71 5.82L2.46 9.48L2 11.41l5 1.36v4.38L1.84 18l.32 2L7 19.18a8.9 8.9 0 0 0 .82 3.57l-4.53 4.54l1.42 1.42l4.19-4.2a9 9 0 0 0 14.2 0l4.19 4.2l1.42-1.42l-4.54-4.54a8.9 8.9 0 0 0 .83-3.57ZM15 25.92A7 7 0 0 1 9 19v-6h6ZM9.29 11a7 7 0 0 1 13.42 0ZM23 19a7 7 0 0 1-6 6.92V13h6Z"
      />
    </svg>
  ),
  "material-symbols:login": (
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"
      />
    </svg>
  ),
  "material-symbols:logout": (
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
      />
    </svg>
  ),
};

const iconShape_missingFallback = (
  <svg viewBox="0 0 48 48">
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
  Object.assign(el.props, {
    xmlns: `http://www.w3.org/2000/svg`,
    width: "1em",
    height: "1em",
  });
  return el;
});
