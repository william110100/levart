import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,jsx,mdx,ts,tsx}",
    "./components/**/*.{js,jsx,mdx,ts,tsx}",
    "./pages/**/*.{js,jsx,mdx,ts,tsx}",
  ],
  plugins: [],
  theme: {},
};

export default config;
