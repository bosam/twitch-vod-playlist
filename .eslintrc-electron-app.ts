import { Linter } from 'eslint';

const errorOrOff: Linter.RuleEntry = 'production' === process.env.NODE_ENV ? 'error' : 'off';

const config: Linter.Config = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  globals: {
    'Atomics': false,
    'SharedArrayBuffer': false
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': errorOrOff,
    'no-debugger': errorOrOff,
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};

module.exports = config;
