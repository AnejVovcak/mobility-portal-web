import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'black': '#000000',
      'white': '#FFFFFF',
      'card-background': '#F6F6F6',
      'light-gray': '#70707052',
      'gray': '#00000029',
      'blue': '#22457D',
      'dark-gray': '#586375',
      'red': '#FF0000',
    }
  },
  plugins: [],
};
export default config;
