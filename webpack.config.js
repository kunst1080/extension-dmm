const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  entry: {
    background: "./src/background.ts",
    bookmark: "./src/bookmark/main.tsx",
    search: "./src/search/main.tsx",
    product: "./src/product/main.tsx",
    top: "./src/top/main.tsx",
    result: "./src/result/main.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./src/manifest.json",
          to: "manifest.json",
        },
        {
          from: "./src/bookmark/style.css",
          to: "bookmark.css",
        },
        {
          from: "./src/search/style.css",
          to: "search.css",
        },
        {
          from: "./src/product/style.css",
          to: "product.css",
        },
        {
          from: "./src/top/style.css",
          to: "top.css",
        },
      ],
    }),
  ],
};
