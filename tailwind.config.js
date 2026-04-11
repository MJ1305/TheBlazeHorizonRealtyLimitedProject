/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       backgroundImage:{
        Background01:"url('/src/Components/Images/img2.jpeg')",
        Background02:"url('/src/Components/Images/img1.jpeg')",
        Background03:"url('/src/Components/Images/img10.jpg')"
      }
    },
   
  },
  plugins: [],
}