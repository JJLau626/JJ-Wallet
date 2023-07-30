module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*", "!font-size"],
      // vant 的样式都不转换
      exclude: "/node_modules/vant"
    }
  },
}
