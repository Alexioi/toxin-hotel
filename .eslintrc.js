module.exports = {
  plugins: ['fsd'],
  extends: ['airbnb-base', 'plugin:fsd/all'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['Libs', './src/libs']],
        map: [['Images', './src/images']],
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
