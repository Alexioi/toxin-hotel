module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: './font/[contenthash].[ext]',
              },
            },
          ],
        },
      ],
    },
  };
};
