module.exports = (path) => {
  return {
    devServer: {
      static: {
        directory: path,
      },
      compress: true,
      port: 3000,
    },
  };
};
