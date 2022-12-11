module.exports = (path) => {
  return {
    devServer: {
      contentBase: path,
      publicPath: '/toxin-hotel',
      compress: true,
      port: 3000,
      host: '0.0.0.0',
    },
  };
};
