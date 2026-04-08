/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       backgroundImage:{
        Background01:"url('/src/Components/Images/img7.jpeg')"
      }
    },
   
  },
  plugins: [],
}