import * as React from "react";

interface Props {
  className: string;
}

function ColoredBorderRadiusSvg(props: Props) {
  return (
    <svg viewBox="0 0 56 56" {...props}>
      <path
        d="M29.465.038a28 28 0 0123.483 40.674l-1.782-.908A26 26 0 0029.361 2.036z"
        fill="var(--yellow-500)"
      />
      <path
        d="M51.483 43.25a28 28 0 01-46.966 0l1.678-1.089a26 26 0 0043.61 0z"
        fill="var(--blue-500)"
      />
      <path
        d="M3.052 40.712A28 28 0 0126.535.038l.104 1.998A26 26 0 004.834 39.804z"
        className="text-red-500"
        fill="var(--red-500)"
      />
    </svg>
  );
}

export default ColoredBorderRadiusSvg;
