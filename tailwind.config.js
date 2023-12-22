/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      darkBlue: "#011E60",    // Header text and button hovers
      lightBlue: "#005596",   // Subheader text and buttons
      orange: "#EDA91F",      // Hover text in navigation bar
      gray: "#4D4D4D",        // Description text in application 
      darkGray: "#C0C0C0",    // Current section of application
      lineGray: "#C1C1C1",    // Line dividers of application
      offWhite: "#F9F9F9"        // Background color of application 
    },

    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
