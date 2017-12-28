/**
 * Webpack production config
 *
 * @Author: 刘谦 <qianliu>
 * @Date:   2016-09-06 15:01
 * @Email:  112486391@qq.com
 */

const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CleanPlugin = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')

module.exports = webpackMerge({}, baseConfig, {
  // 编译方式
  devtool: false,
  // 是否监听文件变化从而触发重新编译
  watch: false,
  // 输出
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  // 插件
  plugins: [
    // 清除上次打包生成的文件，保证目录干净
    new CleanPlugin(path.resolve(__dirname, './dist'), {
      verbose: false, // Do not show logs to console
    }),
    // 压缩 JS
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    // 压缩图片
    new ImageminPlugin({
      disable: false,
      optipng: { optimizationLevel: 3 },
      gifsicle: { optimizationLevel: 1 },
      jpegtran: { progressive: false },
      svgo: {},
      pngquant: {
        quality: '95-100',
        speed: 4
      },
    }),
    // 注入 webpack bundle 到 HTML
    new HtmlPlugin({
      template: './index.html',
      // 压缩 HTML
      minify: {
        collapseWhitespace: true
      }
    }),
    // 开启 Gzip 压缩
    new CompressionPlugin({
      test: /\.js$|\.html$|\.css$/
    })
  ]
})
