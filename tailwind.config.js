/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1200px",
      },
      grayscale: {
        10: "10%",
        20: "20%",
        30: "30%",
        50: "50%",
        70: "70%",
      },
      colors: {
        "logo-900": "#440918",
        logo: "#730f28",
        "logo-800": "#87122F",
        "logo-700": "#B4183F",
        "logo-600": "#E21D4E",
        "logo-500": "#E74B72",
        "logo-400": "#ED7895",
        "logo-300": "#F3A5B8",
        "logo-200": "#F9D2DC",
        "logo-100": "#FCE8ED",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    keyframes: {
      zoomIn: {
        "0%": {
          opacity: 0,
          // transform: "scale3d(.3,.3,.3)",
          transform: "scale(.3)",
        },
        "50%": {
          opacity: 1,
        },
      },
      zoomOut: {
        "0%": {
          opacity: 1,
        },
        "50%": {
          opacity: 0,
          transform: "scale3d(.3,.3,.3)",
        },
      },
    },
    animation: {
      zoomIn: "zoomIn 1s",
      zoomOut: "zoomOut 1s",
    },
  },
  plugins: [require("daisyui")],
};
