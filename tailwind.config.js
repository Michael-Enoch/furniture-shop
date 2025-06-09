export default {
  theme: {
    extend: {
       maxWidth: {
        '7xl': '80rem',     // 1280px (default)
        '8xl': '90rem',     // 1440px
        '9xl': '96rem',     // 1536px
        '10xl': '105rem',   // 1680px
        '11xl': '120rem',   // 1920px
      },
      keyframes: {
        scroll :{
          '0%' : {transform: 'translateX(100%)'},
          '100%' : {transform: 'translateX(-100%)'}
        }
      },
      animation: {
        scroll : 'scroll 20s ease linear infinite',
      },
    },
  },
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // or adjust based on your project
  ],
};
