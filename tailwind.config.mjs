/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-lexend-mega)"],
      },
      colors: {
        brand: {
          blue: '#0290C4', // Logo Blue
          cyan: '#06CDDC', // Logo Cyan
          dark: '#0E6FA2', // Logo Darker Blue
        }
      },
    },
  },
  plugins: [
    // Add the Tailwind Typography plugin here
    import('@tailwindcss/typography')
  ],
};