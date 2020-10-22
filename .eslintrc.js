module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 8,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: ['react'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error', 'always'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single', { 'avoidEscape': true }],
    semi: ['error', 'never'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
