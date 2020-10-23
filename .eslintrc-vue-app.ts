import { Linter } from 'eslint';

const errorOrOff: Linter.RuleEntry = 'production' === process.env.NODE_ENV ? 'error' : 'off';

const config: Linter.Config = {
  root: true,
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    'Atomics': false,
    'SharedArrayBuffer': false
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'vue/require-prop-types': 'off',
    'no-console': 'off',
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
