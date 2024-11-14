/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        netflixRed: '#E50914',
        netflixWhite: '#FFFFFF',
        netflixBlack: '#141414',
        netflixGray: '#B3B3B3',
        netflixGrayBorder: '#383232',
        netflixSkeleton:'#151212',
        netflixSkeleton2:'#2f2a2a',
        netflixLightGray: '#564d4d',
      },
      borderWidth: {
        'half': '0.5px', 
      },
      height: {
        '104': '27rem',
        '106': '30rem', // 800px
      },
    },
  },
  plugins: [],
}

