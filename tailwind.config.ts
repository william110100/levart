import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    screens: {
      sm: {
        max: "600px",
        min: "0px",
      },
      md: {
        max: "900px",
        min: "601px",
      },
      lg: {
        max: "1280px",
        min: "901px",
      },
      xl: {
        min: "1281px",
      },
    },
  },
};
export default config;
