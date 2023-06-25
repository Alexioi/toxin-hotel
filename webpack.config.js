const path = require('path');
const fs = require('fs');
const { merge } = require('webpack-merge');

const pugLoader = require('./webpack/pugLoader');
const fileLoader = require('./webpack/fileLoader');
const fontLoader = require('./webpack/fontLoader');
const styleLoader = require('./webpack/styleLoader');
const tsLoader = require('./webpack/tsLoader');
const devServer = require('./webpack/devServer');
const webpackProvidePlugin = require('./webpack/webpackProvidePlugin');
const miniCssExtractPlugin = require('./webpack/miniCssExtractPlugin');
const copyPlugin = require('./webpack/copyPlugin');
const cleanWebpackPlugin = require('./webpack/cleanWebpackPlugin');
const htmlWebpackPlugin = require('./webpack/htmlWebpackPlugin');

const isDevelopment = process.env.NODE_ENV === 'development';

const paths = {
  src: path.join(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  pages: path.join(__dirname, './src/pages'),
};

const pages = fs.readdirSync(paths.pages);

const commonConfig = merge([
  {
    mode: isDevelopment ? 'development' : 'production',
    context: paths.src,
    entry: './index.js',
    output: {
      path: paths.dist,
      filename: '[contenthash].js',
    },
  },
  {
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@images': path.resolve(__dirname, 'src/images/'),
        '@style': path.resolve(__dirname, 'src/style'),
        '@libs': path.resolve(__dirname, 'src/libs'),
        '@templates': path.resolve(__dirname, 'src/templates'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@helpers': path.resolve(__dirname, 'src/helpers'),
      },
    },
  },
  fileLoader(),
  styleLoader(),
  tsLoader(),
  fontLoader(),
  pugLoader(),
  webpackProvidePlugin(),
  miniCssExtractPlugin(),
  copyPlugin(),
  htmlWebpackPlugin(pages),
  devServer(paths.dist),
]);

const productionConfig = merge([cleanWebpackPlugin()]);

module.exports = () => {
  return isDevelopment
    ? merge([commonConfig])
    : merge([commonConfig, productionConfig]);
};
