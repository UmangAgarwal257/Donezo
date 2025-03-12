import React, { CSSProperties } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const GradientWrapper = ({ children, className = "" }: Props) => {
  const styles = {
    "--radius": "34px",
    "--diameter": "68px",
    "--mask-stroke": "1.5px",
    "--mask-inner-distance":
      "calc(50% - var(--mask-stroke) - var(--mask-stroke))",
    "--mask-outer-distance": "calc(50% - var(--mask-stroke))",
  } as CSSProperties;
  return (
    <div
      className={`relative ${className}`}
      style={{
        background:
          "conic-gradient(from 270deg at var(--radius) var(--radius), transparent 0deg, white 45deg, transparent 170deg), transparent",
        borderRadius: "var(--radius)",
        maskImage: [
          "linear-gradient(to right, black, black)",
          "linear-gradient(to right, transparent var(--mask-stroke), black calc(var(--mask-stroke) * 2))",
          "linear-gradient(to bottom, transparent var(--mask-stroke), black calc(var(--mask-stroke) * 2))",
          "linear-gradient(to right, black calc(var(--radius) - var(--mask-stroke)), transparent var(--radius))",
          "linear-gradient(to bottom, black calc(var(--radius) - var(--mask-stroke)), transparent var(--radius))",
          "radial-gradient(var(--diameter) var(--diameter) at var(--radius) var(--radius), black var(--mask-inner-distance), transparent var(--mask-outer-distance))",
        ].join(", "),
        maskComposite: "exclude, intersect, subtract, intersect, subtract, add",
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        ...styles,
      }}
    >
      {children}
    </div>
  );
};

export default GradientWrapper;