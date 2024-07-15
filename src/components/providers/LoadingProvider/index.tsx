import React, { useState } from "react";
import ReactLottie from "lottie-react";
import lottieLoading from "./lottieLoading.json";

type Props = {
  children: React.ReactNode;
};

type ContextProps = {
  setLoading: (value: boolean) => void; // eslint-disable-line
};

export const LoadingContext = React.createContext<ContextProps>({
  setLoading: () => {},
});

const LoadingProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (value: boolean) => {
    setIsLoading(value);
  };

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {isLoading && (
        <div className="fixed w-full h-full left-0 top-0 z-[200] bg-primary-800/30 dark:bg-dark-main/80 backdrop-blur-md">
          <div className="w-[200px] mx-auto mt-[50vh] translate-y-[-50%]">
            <ReactLottie animationData={lottieLoading} loop={true} className="w-full " />
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
