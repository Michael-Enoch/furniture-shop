export default {
  theme: {
    extend: {
      maxWidth: {
        "7xl": "80rem", // 1280px (default)
        "8xl": "90rem", // 1440px
        "9xl": "96rem", // 1536px
        "10xl": "105rem", // 1680px
        "11xl": "120rem", // 1920px
      },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // or adjust based on your project
  ],
};
