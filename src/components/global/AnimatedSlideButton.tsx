import React from "react";

type Props = {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
  backClassName?: string;
  isSubmit?: boolean;
  isLoading?: boolean;
};

const AnimatedSlideButton = ({ children, className, onClick, backClassName, isSubmit, isLoading }: Props) => {
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={`font-semibold relative group outline-none rounded-full overflow-hidden ${className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      <span
        className={`absolute -left-full group-hover:left-0 group-focus:left-0 top-0 w-full h-full transition-all duration-200 bg-gradient-to-r  ${
          backClassName || "from-primary-400 to-secondary-300"
        }`}
      ></span>
      <span className="relative z-10">
        {isLoading ? (
          <div className="flex items-center gap-8">
            <span className="animate-spin w-16 h-16 border-2 border-white/20 border-t-white rounded-full"></span>
            {children}
          </div>
        ) : (
          children
        )}
      </span>
    </button>
  );
};

export default AnimatedSlideButton;
