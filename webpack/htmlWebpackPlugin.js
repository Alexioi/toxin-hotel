const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (pages) => {
  return {
    plugins: [
      ...pages.map(
        (page) =>
          new HtmlWebpackPlugin({
            filename: `${page}.html`,
            template: `./pages/${page}/${page}.pug`,
          }),
      ),
    ],
  };
};
