
var path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");



module.exports = {
  entry: "./src/index.js",

  output: {
    // publiPath: '/',
    path: path.resolve(__dirname, "app"),
    filename: "app.js",
  },


  devServer: {
    static: {
      directory: path.join(__dirname, "/app"),
    },
		devMiddleware: {
      writeToDisk: true,
    },
    port: 8080,
    compress: true,
		// open: true,
		// hot: false,
  },


  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'postcss-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        exclude: /images/,
        use: [
          {
            loader: "file-loader", 
            options: {
              name: '[name].[ext]',
              outputPath: "assets/fonts",
            }
          }
        ]
      },

    ],
  },

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    //new OptimizeCSSAssetsPlugin({}),
    new CssMinimizerPlugin(),
    new MiniCssExtractPlugin({
      filename: "assets/css/style.css"
    }),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
};
