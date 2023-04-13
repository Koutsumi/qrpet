/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "principal": "#ff7272",
      "secundaria": "#fcd0d0",
      "terciaria": "#dc4759",
      "white": "#ffff",
      "black": "#000"
    },
    backgroundImage: {
      "login": "url('./src/assets/images/gatoLogin.jpg')",
      "none": "url('')",
      "Dog": "url('./src/assets/images/dogperdido.png')"
    }
  },
  plugins: [],
}