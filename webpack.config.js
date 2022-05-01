const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    "content-script": "./src/content.tsx",
    background: "./src/background.ts",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./src/manifest.json",
          to: "manifest.json",
        },
        {
          from: "./src/popup.html",
          to: "popup.html",
        },
      ],
    }),
  ],
};
