const path = require("path");
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

module.exports = {
  entry: "./src/client/index.js",
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
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource",
      }
    ]
  },
  resolve: {
      alias: {
        'client': path.resolve(__dirname, 'src/client'),
        'server': path.resolve(__dirname, 'src/server'),
        'assets': path.resolve(__dirname, 'assets'),
      },
      extensions: ["*", ".js", ".jsx"] 
  },
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
    hot: true,
    devMiddleware: {
      publicPath: "http://localhost:3000/dist/",
    },
  },
  plugins: [
    new ReactRefreshPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
};
