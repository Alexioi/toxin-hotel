module.exports = {
  plugins: ['fsd'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:fsd/all',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@libs', './src/libs'],
          ['@images', './src/images'],
          ['@components', './src/components'],
          ['@helpers', './src/helpers'],
        ],
      },
    },
  },
  env: {
    browser: true,
    node: true,
    jquery: true,
  },
  rules: {
    'no-underscore-dangle': 'off',
    'linebreak-style': 'off',
    'no-new': 'off',
    'object-curly-newline': ['error', { multiline: true }],
    'arrow-body-style': ['error', 'always'],
    '@typescript-eslint/indent': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'import/prefer-default-export': 'off',
  },
};
