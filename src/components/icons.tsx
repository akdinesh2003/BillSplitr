
import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="10" cy="14" r="5" />
      <path d="M19 9.5a5 5 0 1 0-5.7 6.2"/>
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  ),
};
