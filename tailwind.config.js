/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        "zenn-primary": "#3ea8ff",
        "qiita-primary": "#67cb1b",
        "mdn-primary": "#44f",
      },
    },
  },
  plugins: [],
};
