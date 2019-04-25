module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "no-console":0,
    "consistent-return": 0,
    "array-callback-return": 0,
    "import/no-extraneous-dependencies":0,
    "no-undef":0,
    "eslint-disable no-unused-vars":off,
    "eslint-disable no-restricted-globals":off,
  },
};
