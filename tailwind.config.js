/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', 'serif'], // Roboto font
        archivo: ['"Archivo"', 'sans-serif'], // Archivo font
        lora: ['"Lora"', 'serif'], // Lora font
        mono: ['"Major Mono Display"', 'monospace'], // Major Mono Display font
      }
    },
  },
  plugins: [],
}