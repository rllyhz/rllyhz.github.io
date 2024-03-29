const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/scripts/index.js"),
    sw: path.resolve(__dirname, "src/scripts/sw.js"),
  },
  output: {
    filename: "[name][contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: "~",
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Rllyhz's Github Pages",
      filename: "index.html",
      template: path.resolve(__dirname, "src/templates/index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/"),
          globOptions: {
            // ignore: ["**/images/heros/**"],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),

    // use webpack-shell-plugin because since this webpack config is using
    // bundle-analyzer-plugin in watch mode (production-mode) on webpack.build.js,
    // if npm command written like this "npm run build && npm run compress-images"
    // in package.json file, then the second command of it (which is "npm run compress-images")
    // would never be executed. Alternatively, this would help.
    // https://stackoverflow.com/questions/58325548/how-to-execute-my-own-script-after-every-webpacks-auto-build-in-watch-mode-of-v
    // https://github.com/1337programming/webpack-shell-plugin/issues/73
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ["echo Starting build project..."],
        blocking: true,
        parallel: false,
      },
      onBuildEnd: {
        scripts: ["npm run compress-images", "echo Project has built successfully!"],
        blocking: false,
        parallel: false,
      },
    }),
    //
  ],
};
