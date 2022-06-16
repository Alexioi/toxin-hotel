module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(svg|png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: './img/[contenthash].[ext]',
                esModule: false,
              },
            },
          ],
        },
      ],
    },
  };
};
