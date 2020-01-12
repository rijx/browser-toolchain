module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    "@babel/plugin-transform-react-jsx",
    ["babel-plugin-transform-async-to-promises", { inlineHelpers: true }],
    "babel-plugin-react-require",
    "@babel/plugin-transform-runtime",
    "babel-plugin-transform-for-of-as-array",
    "babel-plugin-import-to-require"
  ]
};
