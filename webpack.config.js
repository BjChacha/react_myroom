const path = require("path");
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"] 
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./public"),
    },
    port: 3000,
    devMiddleware: {
      publicPath: "http://localhost:3000/dist/",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "MyRoom App",
    }),
    new ReactRefreshPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};