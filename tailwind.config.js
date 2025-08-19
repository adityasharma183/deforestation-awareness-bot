module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: "#228B22",
        bark: "#8B4513",
        leaf: "#2E8B57",
        sky: "#87CEEB",
        earth: "#A0522D",
      },
      backgroundImage: {
        "forest-gradient": "linear-gradient(to bottom right, #2E8B57, #228B22)",
        "sky-gradient": "linear-gradient(to bottom right, #87CEEB, #2E8B57)",
      }
    },
  },
  plugins: [],
}

