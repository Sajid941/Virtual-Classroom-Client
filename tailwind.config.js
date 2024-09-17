import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF',
        body: '#ffffff',
        neutral: "#F8F9FA",
        neutraldark: "#343A40",
        secondary: "#004085",
        accent: "#FFC107",
      },
      fontFamily: {
        inter: '"Inter", system-ui',
        roboto: '"Roboto", system-ui',
      },
      backgroundImage: {
        // Add your custom backgrounds here
      },
    },
  },
  plugins: [daisyui],
};
