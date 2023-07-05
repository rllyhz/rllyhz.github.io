const { merge } = require("webpack-merge");
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {
  output: {
    filename: "[name][contenthash].bundle.js",
    path: path.resolve(__dirname, "published_dist"),
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

    // override this plugin on the common config
    // to copy assets files to the correct folder (published_dist)
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "published_dist/"),
          globOptions: {
            // ignore: ["**/images/heros/**"],
          },
        },
      ],
    }),
  ],
});
