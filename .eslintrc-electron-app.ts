import {Linter} from 'eslint';

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
        'no-console': 'production' === process.env.NODE_ENV ? 'error' : 'off',
        'no-debugger': 'production' === process.env.NODE_ENV ? 'error' : 'off',
        'indent': [
            'error',
            4
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
