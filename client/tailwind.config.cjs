module.exports = {
    darkMode: ["class", '[data-theme="dark"]'],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      screens: {
        "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }
  
        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }
  
        lg: { min: "768px", max: "1023px" },
        // => @media (max-width: 1023px) { ... }
  
        md: { min: "1024px", max: "1800px" },
  
        sm: { max: "767px" },
        // => @media (max-width: 767px) { ... }
  
        "small-mobile": { max: "639px" },
        // => @media (max-width: 639px) { ... }
      },
      extend: {},
    },
    plugins: [],
  }
  