export default {
  theme: {
    extend: {
      animation: {
        marquee: 'scroll-left 30s linear infinite',
        fadeIn: "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
         'scroll-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.98)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
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
