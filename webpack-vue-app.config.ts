import { resolve } from 'path';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackShellPlugin from 'webpack-shell-plugin';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: (process.env.NODE_ENV as 'development' | 'production' | 'none'),
  target: 'electron-renderer',
  entry: resolve(__dirname, 'src/vue-app/main.ts'),
  output: {
    path: resolve(__dirname, 'dist/vue-app/'),
//		target: "/",
    filename: 'javascript/[name].[hash:8].js',
    chunkFilename: 'javascript/[id].[chunkhash:8].js'
  },
  node: {
    __filename: true,
    __dirname: true
  },
  devServer: {
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: true
    }
  },
  performance: {
    hints: false
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(vue|m?js|ts)$/i,
      exclude: /(node_modules|bower_components)/,
      loader: 'eslint-loader',
      options: {
        configFile: resolve(__dirname, '.eslintrc-vue-app.js'),
        emitError: true,
        emitWarning: true,
        failOnError: true,
        failOnWarning: true,
        fix: true
      }
    }, {
      test: /\.vue$/i,
      loader: 'vue-loader'
    }, {
      test: /\.(m?js|ts)$/i,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components)/,
      options: {
        comments: false,
        minified: true
      }
    }, {
      test: /\.css$/i,
      use: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
            // 0 => no loaders (default);
            // 1 => postcss-loader;
          }
        },
        'postcss-loader'
      ]
    }, {
      test: /\.scss$/i,
      use: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
            // 0 => no loaders (default);
            // 1 => postcss-loader;
            // 2 => postcss-loader, sass-loader
          }
        },
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              outputStyle: 'compressed'
            }
          }
        }
      ]
    }, {
      test: /\.sass$/i,
      use: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
            // 0 => no loaders (default);
            // 1 => postcss-loader;
            // 2 => postcss-loader, sass-loader
          }
        },
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              indentedSyntax: true,
              outputStyle: 'compressed'
            }
          }
        }
      ]
    }, {
      test: /\.svg(\?.*)?$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
          esModule: false
        }
      }, {
        loader: 'svgo-loader',
        options: {
          plugins: [{
            removeViewBox: false
          }]
        }
      }]
    }, {
      test: /\.(png|jpe?g|gif|ico)(\?.*)?$/i,
      loader: 'file-loader',
      options: {
        name: 'images/[name].[hash:8].[ext]',
        esModule: false
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
      loader: 'file-loader',
      options: {
        name: 'media/[name].[hash:8].[ext]',
        esModule: false
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[hash:8].[ext]',
        esModule: false
      }
    }
    ]
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildStart: ['yarn run compile:config-files']
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('src/vue-app/index.html'),
      inject: true,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        html5: true,
        keepClosingSlash: true,
        removeComments: true
      },
      xhtml: true
    })
  ],
  resolve: {
    extensions: ['.vue', '.js', 'mjs', '.json', '.ts'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve(__dirname, 'src/vue-app/')
    }
  }
};

export default config;
