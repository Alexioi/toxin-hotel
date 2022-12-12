module.exports = (path) => {
  return {
    devServer: {
      static: {
        directory: path,
      },
      compress: true,
      port: 3000,
      hot: false,
      proxy: {
        '/toxin-hotel': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/toxin-hotel': '' },
        },
      },
    },
  };
};
