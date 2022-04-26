const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const IsProduction = !isDevelopment;

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

const PAGES = fs.readdirSync(path.join(__dirname, './src/pages'));

module.exports = {
  mode: 'development',
  context: PATHS.src,
  entry: './index.js',
  output: {
    path: PATHS.dist,
    filename: '[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.pug$/i,
        use: ['pug-loader'],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './img/[contenthash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './font/[contenthash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new CleanWebpackPlugin(),
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          filename: `${page}.html`,
          template: `./pages/${page}/${page}.pug`,
        }),
    ),
    new CopyPlugin({
      patterns: [{ from: 'favicon', to: 'favicon' }],
    }),
    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    host: '0.0.0.0',
  },
};
