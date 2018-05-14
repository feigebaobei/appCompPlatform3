'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './template/index.html',
      inject: true,
      chunks: ['app']
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'appManitor.html',
    //   template: './template/appManitor/appManitor.html',
    //   inject: true,
    //   chunks: ['appManitor']
    // }),
    new HtmlWebpackPlugin({
      filename: 'appInstanceList.html',
      template: './template/appManitor/appInstanceList.html',
      inject: true,
      chunks: ['appInstanceList']
    }),
    new HtmlWebpackPlugin({
      filename: 'appInstance.html',
      template: './template/appManitor/appInstance.html',
      inject: true,
      chunks: ['appInstance']
    }),
    new HtmlWebpackPlugin({
      filename: 'appAlertList.html',
      template: './template/appManitor/appAlertList.html',
      inject: true,
      chunks: ['appAlertList']
    }),
    new HtmlWebpackPlugin({
      filename: 'appAlertEdit.html',
      template: './template/appManitor/appAlertEdit.html',
      inject: true,
      chunks: ['appAlertEdit']
    }),
    new HtmlWebpackPlugin({
      filename: 'appDetail.html',
      template: './template/appManitor/appDetail.html',
      inject: true,
      chunks: ['appDetail']
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'compOverview.html',
    //   template: './template/compOverview/compOverview.html',
    //   inject: true,
    //   chunks: ['compOverview']
    // }),
    new HtmlWebpackPlugin({
      filename: 'compInstanceList.html',
      template: './template/compOverview/compInstanceList.html',
      inject: true,
      chunks: ['compInstanceList']
    }),
    new HtmlWebpackPlugin({
      filename: 'compInstance.html',
      template: './template/compOverview/compInstance.html',
      inject: true,
      chunks: ['compInstance']
    }),
    new HtmlWebpackPlugin({
      filename: 'compAlertList.html',
      template: './template/compOverview/compAlertList.html',
      inject: true,
      chunks: ['compAlertList']
    }),
    new HtmlWebpackPlugin({
      filename: 'compAlertEdit.html',
      template: './template/compOverview/compAlertEdit.html',
      inject: true,
      chunks: ['compAlertEdit']
    }),
    new HtmlWebpackPlugin({
      filename: 'compBackupsList.html',
      template: './template/compOverview/compBackupsList.html',
      inject: true,
      chunks: ['compBackupsList']
    }),
    new HtmlWebpackPlugin({
      filename: 'compBackupsEdit.html',
      template: './template/compOverview/compBackupsEdit.html',
      inject: true,
      chunks: ['compBackupsEdit']
    }),
    new HtmlWebpackPlugin({
      filename: 'compBackups.html',
      template: './template/compOverview/compBackups.html',
      inject: true,
      chunks: ['compBackups']
    }),
    new HtmlWebpackPlugin({
      filename: 'compRecoverList.html',
      template: './template/compOverview/compRecoverList.html',
      inject: true,
      chunks: ['compRecoverList']
    }),
    new HtmlWebpackPlugin({
      filename: 'compAuditEdit.html',
      template: './template/compOverview/compAuditEdit.html',
      inject: true,
      chunks: ['compAuditEdit']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
