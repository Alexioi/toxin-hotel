module.exports = {
  plugins: ['fsd'],
  extends: ['airbnb-base', 'plugin:fsd/all'],
  rules: {
    'no-underscore-dangle': 'off',
    'linebreak-style': 'off',
    'no-undef': 'off',
    'no-new': 'off',
    'no-useless-catch': 'off',
    'no-async-promise-executor': 'off',
    'no-misleading-character-class': 'off',
    'no-restricted-globals': 'off',
    'max-classes-per-file': 'off',
    'no-use-before-define': 'off',
    'class-methods-use-this': 'off',
    'arrow-body-style': 'off',
    'operator-assignment': 'off',
  },
};
