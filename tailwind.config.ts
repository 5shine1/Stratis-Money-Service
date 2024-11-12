/** @type {import('tailwindcss').Config} */

const range = (start: number, end: number, increment = 1) => {
  const count = Math.floor((end - start + 1) / increment);
  return Array(count)
    .fill(0)
    .map((_, idx) => start + idx * increment);
};

const minSpacingPixel = 0;
const maxSpacingPixel = 2000;
const spacingPixelIncrement = 1;

const minFontSize = 4;
const maxFontSize = 140;

module.exports = {
  // darkMode: "selector",
  content: ["./src/**/*.tsx"],
  theme: {
    spacing: {
      ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce(
        (merged, f) => ({ ...merged, [f]: `${f}px` }),
        {}
      ),
    },
    fontFamily: {
      sora: "Sora",
      inter: "Inter",
    },
    extend: {
      fontSize: {
        ...range(minFontSize, maxFontSize).reduce((merged, f) => ({ ...merged, [f]: `${f}px` }), {}),
      },
      gap: (theme: any) => theme("spacing"),
      height: (theme: any) => ({
        ...theme("spacing"),
      }),
      width: (theme: any) => ({
        ...theme("spacing"),
      }),
      inset: (theme: any, { negative }: any) => ({
        ...theme("spacing"),
        ...negative(theme("spacing")),
      }),
      borderRadius: (theme: any) => ({
        ...theme("spacing"),
      }),

      animation: {
        spinSlow: "spin 10s linear infinite",
        pingSlow: "ping 1.5s linear infinite",
      },

      boxShadow: {
        tab: "0 0 18px 0 #4294B41a",
      },
      colors: {
        primary: {
          100: "#C0D4C9",
          200: "#136165",
          300: "#2D6A77",
          400: "#2589ac",
          500: "#0b3b48",
          600: "#082d40",
          700: "#072a36",
          800: "#030C11",
          900: "#010D15",
        },
        secondary: {
          100: "#F6D28A",
          200: "#e7bc69 ",
          300: "#DB9B1E",
          400: "#FFBF44",
          main: "#dead3d",
        },
        error: {
          DEFAULT: "#F26161",
        },
        success: {
          DEFAULT: "#45c931",
        },
        info: {
          DEFAULT: "#00b2f9",
        },
        modal: {
          border: "#07263c",
        },
        input: {
          placeholder: "#45515A",
          text: "#BDCCD8",
          label: "#6B7A87",
          border: "#213541",
        },
        button: {
          text: "#DDAC3E",
          from: "#95845C80",
          to: "#4294B580",
          border: "#95845C",
        },
      },
    },
  },
  plugins: [],
};
