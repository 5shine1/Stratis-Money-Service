import React, { createContext, useState, useEffect } from "react";

interface ScrollContextProps {
  scroll: number;
  scrollTo: (position: number) => void;
}

type Props = {
  children: React.ReactNode;
};

export const ScrollContext = createContext<ScrollContextProps>({
  scroll: 0,
  scrollTo: () => {},
});

export const ScrollProvider = ({ children }: Props) => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (position: number) => {
    window.scrollTo({ top: position, behavior: "smooth" });
  };

  return (
    <ScrollContext.Provider value={{ scroll, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
};
