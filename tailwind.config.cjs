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
      "black": "#000",
      "red": "#F70021",
      "secundarioLogin": "rgb(252, 208, 208, 0.6)"
    },
    backgroundImage: {
      "login": "url('./src/assets/images/gatoLogin.jpg')",
      "none": "url('')",
      "Dog": "url('./src/assets/images/dogperdido.png')",
      "login2": "url('./src/assets/images/gatinho.jpg')"
    }
  },
  plugins: [],
}