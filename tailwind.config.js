/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customGray: '#F2F4F5',
        customAmber: '#C2A74D',
        customPink: '#FFE7D6',
        customBlue: '#4A4ABF',
      },
      fontFamily: {
        afacad: ['Afacad Flux', 'sans-serif'],
        agdasima: ['Agdasima', 'sans-serif'],
        josefin: ['Josefin Sans', 'sans-serif'],
        sourceCode: ['Source Code Pro', 'monospace'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
