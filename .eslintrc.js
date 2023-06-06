module.exports = {
  plugins: ['fsd'],
  extends: ['airbnb-base', 'airbnb-typescript/base', 'plugin:fsd/all'],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@libs', './src/libs'],
          ['@images', './src/images'],
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
  },
};
