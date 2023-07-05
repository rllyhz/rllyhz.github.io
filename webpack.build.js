const { merge } = require("webpack-merge");
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const common = require("./webpack.common");

module.exports = merge(common, {
  output: {
    filename: "[name][contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});
