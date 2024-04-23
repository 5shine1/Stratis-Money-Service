import React from "react";

type Props = {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
};

const AnimatedSlideButton = ({ children, className, onClick }: Props) => {
  return (
    <button
      className={`font-semibold relative group outline-none rounded-full overflow-hidden ${className}`}
      onClick={onClick}
    >
      <span
        className={
          "absolute -left-full group-hover:left-0 top-0 w-full h-full transition-all duration-300 bg-green-400"
        }
      ></span>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default AnimatedSlideButton;
