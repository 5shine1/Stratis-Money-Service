import { useEffect, useState } from "react";

export interface IDarkMode {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function useDarkMode(): IDarkMode {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (window.localStorage.getItem("stratis-theme") === "light") {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (!isDarkMode) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("stratis-theme", "dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("stratis-theme", "light");
    }
  };

  return {
    isDarkMode,
    toggleTheme,
  };
}
