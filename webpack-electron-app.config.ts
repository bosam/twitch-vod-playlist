import { resolve } from 'path';
import { readdirSync } from 'fs';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as webpack from 'webpack';
import WebpackShellPlugin from 'webpack-shell-plugin';

const nodeModules = {};
readdirSync('node_modules').filter(mods => !['.bin', '.cache'].includes(mods)).forEach(mod => nodeModules[mod] = `require("${mod}")`);

const config: webpack.Configuration = {
	mode: (process.env.NODE_ENV as 'development' | 'production' | 'none'),
	target: 'electron-main',
	entry: resolve(__dirname, 'src/electron-app/main.ts'),
	output: {
		path: resolve(__dirname, 'dist/electron-app/')
	},
	externals: nodeModules,
	node: {
		__filename: false,
		__dirname: false
	},
	performance: {
		hints: false
	},
	module: {
		rules: [{
			enforce: 'pre',
			test: /\.m?js$/i,
			exclude: /node_modules/,
			loader: 'eslint-loader',
			options: {
				configFile: resolve(__dirname, '.eslintrc-electron-app.js'),
				emitError: true,
				emitWarning: true,
				failOnError: true,
				failOnWarning: true,
				fix: true
			}
		}, {
			test: /\.m?js$/i,
			loader: 'babel-loader',
			options: {
				comments: false,
				minified: true
			}
		},
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },]
	},
	plugins: [
	    new WebpackShellPlugin({
            onBuildStart: ['yarn run compile:config-files']
        }),
        new CleanWebpackPlugin()
	],
	resolve: {
		extensions: ['.js', '.mjs', '.json', '.ts'],
		alias: {
			'@': resolve(__dirname, 'src/electron-app/')
		}
	}
};

export default config;
