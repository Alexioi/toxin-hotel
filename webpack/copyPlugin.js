const CopyPlugin = require('copy-webpack-plugin');

module.exports = () => {
  return {
    plugins: [
      new CopyPlugin({
        patterns: [{ from: 'favicon', to: 'favicon' }],
      }),
    ],
  };
};
