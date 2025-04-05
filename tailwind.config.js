/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#151312',
          200: '#231D58',
          300: '#404072',
        },
        light: {
          100: '#A8B5DB'
        }
      }
    },
  },
  plugins: [],
}