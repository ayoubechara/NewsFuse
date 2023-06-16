/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  // enable dark mode via class strategy
  darkMode: 'class',
  plugins: [
    require('flowbite/plugin')
  ],
}

