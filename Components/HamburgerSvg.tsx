import React from "react";

type Props = { className: string };

function HamburgerSvg(props: Props) {
  return (
    <svg
      // width="64px"
      // height="64px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g stroke="#000" strokeWidth={2} strokeLinecap="round">
        <path d="M4 18h16M4 12h16M4 6h16" />
      </g>
    </svg>
  );
}

export default HamburgerSvg;
