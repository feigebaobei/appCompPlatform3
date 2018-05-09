'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js',
    // appManitor: './src/pages/redis/appManitor/appManitor.js',
    appInstanceList: './src/pages/redis/appManitor/instanceList.js',
    appInstance: './src/pages/redis/appManitor/instance.js',
    appAlertList: './src/pages/redis/appManitor/alertList.js',
    appAlertEdit: './src/pages/redis/appManitor/alertEdit.js',
    appDetail: './src/pages/redis/appManitor/appDetail.js',
    // compOverview: './src/pages/redis/compOverview/compOverview.js',
    compInstanceList: './src/pages/redis/compOverview/instanceList.js',
    compInstance: './src/pages/redis/compOverview/instance.js',
    compAlertList: './src/pages/redis/compOverview/alertList.js',
    compAlertEdit: './src/pages/redis/compOverview/alertEdit.js',
    compBackupsList: './src/pages/redis/compOverview/backupsList.js',
    compBackups: './src/pages/redis/compOverview/backups.js',
    compRecoverList: './src/pages/redis/compOverview/recoverList.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 257000, // 这个数值是由加载的东西的体积和决定的
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      /* sass loader start */
      {
        test: /\.(sass|scss)?$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
      /* sass loader end */
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
