import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        "dark-gray": "#121212",
        "semi-dark-gray": "#1c1c1c"
      }
    }
  },
  plugins: []
} as Config;
