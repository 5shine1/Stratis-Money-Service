import React from "react";

type Props = {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
  backClassName?: string;
};

const AnimatedSlideButton = ({ children, className, onClick, backClassName }: Props) => {
  return (
    <button
      className={`font-semibold relative group outline-none rounded-full overflow-hidden ${className}`}
      onClick={onClick}
    >
      <span
        className={`absolute -left-full group-hover:left-0 group-focus:left-0 top-0 w-full h-full transition-all duration-200 bg-gradient-to-r  ${
          backClassName || "from-primary-400 to-secondary-300"
        }`}
      ></span>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default AnimatedSlideButton;
