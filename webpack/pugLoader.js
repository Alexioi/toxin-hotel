module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.pug$/i,
          use: ['pug-loader'],
        },
      ],
    },
  };
};
