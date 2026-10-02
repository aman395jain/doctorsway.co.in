import type { SVGProps } from "react";

type IconName =
  | "calendar"
  | "check"
  | "clock"
  | "map"
  | "pin"
  | "search"
  | "send"
  | "star"
  | "stethoscope"
  | "truck";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

const iconPaths: Record<IconName, React.ReactNode> = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
    </>
  ),
  check: (
    <>
      <path d="m8.5 12 2.2 2.2 4.8-5" />
      <path d="M12 2.8 14.3 4l2.6-.1.9 2.4 2.1 1.5-.7 2.5.7 2.5-2.1 1.5-.9 2.4-2.6-.1-2.3 1.2-2.3-1.2-2.6.1-.9-2.4-2.1-1.5.7-2.5-.7-2.5 2.1-1.5.9-2.4 2.6.1z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  map: (
    <>
      <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
      <path d="M9 3v15M15 6v15" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 5 5" />
    </>
  ),
  send: <path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13" />,
  star: (
    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
  ),
  stethoscope: (
    <>
      <path d="M6 3v6a4 4 0 0 0 8 0V3M4 3h4M12 3h4M10 13v2a4 4 0 0 0 8 0v-1" />
      <circle cx="18" cy="12" r="2" />
      <path d="M18 18v2a2 2 0 0 0 4 0v-1" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h12v12H3zM15 10h4l3 3v5h-7z" />
      <circle cx="7.5" cy="18.5" r="1.5" />
      <circle cx="18.5" cy="18.5" r="1.5" />
      <path d="M8 10v4M6 12h4" />
    </>
  ),
};

export default function Icon({ name, size = 18, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {iconPaths[name]}
    </svg>
  );
}
