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
      lightGray: "#C1C1C1",   // Line dividers of application
      offWhite: "#F9F9F9"     // Background color of application 
    },

    screens: {
      'xxxlg': {'max': '1600px'},       // Big Boi Monitors 
      'xxlg': {'max': '1440px'},        // Large Computers
      'xlg': {'max': '1250px'},         // Regular Computers
      'lg': {'max': '1024px'},          // Small Computers
      'md': {'max': '850px'},           // Regular Tablets
      'sm': {'max': '600px'},           // Small Tablets 
      'xsm': {'max': '480px'},          // Regular Phones
      'xxsm': {'max': '360px'},         // Small Phones
    },

    extend: {
      keyframes: {
        translateY: {
          '100%': { transform: 'translateY(0)', opacity: '1' },
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
        },
        translateYY: {
          '100%': { transform: 'translateY(0)', opacity: '1' },
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
        },
      },

      animation: {
        'hamburgerFade': 'translateY 400ms ease-in-out',
        'componentFade': 'translateYY 300ms ease-out',
      },

      backgroundImage: {
        'mjc': "url('/images/background.png')",
      },
    },
  },
  plugins: [],
}
