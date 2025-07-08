/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/**/*.{js,jsx,ts,tsx,html}",
    // add other paths as needed
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    // add other plugins here
  ],
}