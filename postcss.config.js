module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*", "!font-size"]
    }
  },
}
