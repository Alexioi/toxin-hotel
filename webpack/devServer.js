module.exports = (path) => {
  return {
    devServer: {
      contentBase: path,
      compress: true,
      port: 3000,
      host: '0.0.0.0',
    },
  };
};
