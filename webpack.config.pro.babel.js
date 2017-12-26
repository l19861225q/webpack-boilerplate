/**
 * Webpack production config
 *
 * @Author: 刘谦 <qianliu>
 * @Date:   2016-09-06 15:01
 * @Email:  112486391@qq.com
 */

import path from 'path'
import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import ImageminPlugin from 'imagemin-webpack-plugin'
import CleanPlugin from 'clean-webpack-plugin'
import HtmlPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import baseConfig from './webpack.config.base.js'
import { dllName, dllDir } from './webpack.config.dll.babel'

const dllFile = `${dllName}.dll.min.js`

const config = webpackMerge({}, baseConfig, {
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
      compress: { warnings: false },
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
      [dllName]: dllFile,
      // 压缩 HTML
      minify: {
        collapseWhitespace: true
      }
    }),
    // Copy dll to /dist
    new CopyPlugin([
      {
        from: path.join(__dirname, dllDir, dllFile),
        flatten: true
      }
    ]),
    // 开启 Gzip 压缩
    new CompressionPlugin({
      test: /\.js$|\.html$|\.css$/
    })
  ]
})

module.exports = config
