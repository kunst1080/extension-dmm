const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  entry: {
    background: "./src/background.ts",
    book: "./src/book/main.tsx",
    search: "./src/search/main.tsx",
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
          from: "./src/style.css",
          to: "style.css",
        },
      ],
    }),
  ],
};
