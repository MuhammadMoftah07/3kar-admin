/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
        },
      },
      colors: {
        theme1: "#004B40",
        theme2: "#0D785A",
        theme3: "#55A28C",
        theme4: "#CCD9D5",
        theme5: "#CD901B",
        theme6: "#10570A",
        google: "#E16262",
        facebook: "#1778F2",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
