import { useEffect, useState } from "react";

export interface IDarkMode {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function useDarkMode(): IDarkMode {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (window.localStorage.getItem("stratis-theme") === "dark") {
      document.documentElement.classList.remove("light");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.add("light");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (!isDarkMode) {
      setIsDarkMode(true);
      document.documentElement.classList.remove("light");
      localStorage.setItem("stratis-theme", "dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.add("light");
      localStorage.setItem("stratis-theme", "light");
    }
  };

  return {
    isDarkMode,
    toggleTheme,
  };
}
