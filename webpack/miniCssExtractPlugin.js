const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  return {
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[contenthash].css',
      }),
    ],
  };
};
