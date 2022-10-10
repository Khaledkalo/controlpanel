
var path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");



module.exports = {
  // entry: "./src/index.js",

  // output: {
  //   // publiPath: '/',
  //   path: path.resolve(__dirname, "app"),
  //   filename: "app.js",
  // },
  entry:  {
    'app': './src/index.js',
    'assets/js/banner': './src/assets/js/banner.js',
    'assets/js/chart': './src/assets/js/chart.js',
    'assets/js/tabs': './src/assets/js/tabs.js',
    'assets/js/upload': './src/assets/js/upload.js'
  },
  output: {
    path: path.join(__dirname, "/app"),
    publicPath: '/',
    filename: '[name].js',
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
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
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
      chunks: ['app', 'assets/js/banner', 'assets/js/tabs', 'assets/js/chart']
    }),

    new HtmlWebpackPlugin({
      filename: "components/button.html",
      template: "./src/components/button.html",
      chunks: ['app']
    }),

    new HtmlWebpackPlugin({
      filename: "components/textfield.html",
      template: "./src/components/textfield.html",
      chunks: ['app']
    }),

    new HtmlWebpackPlugin({
      filename: "components/card.html",
      template: "./src/components/card.html",
      chunks: ['app']
    }),

    new HtmlWebpackPlugin({
      filename: "components/banner.html",
      template: "./src/components/banner.html",
      chunks: ['app', 'assets/js/banner']
    }),

  ],
};
