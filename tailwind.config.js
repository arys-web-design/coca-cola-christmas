export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        "postcard-ink": "hsl(var(--postcard-ink) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["Lora", "Georgia", "serif"],
        handwriting: ["Caveat", "cursive"],
      },
      fontSize: { "figma-56": "min(56px, 5vw)" },
    },
  },
};
