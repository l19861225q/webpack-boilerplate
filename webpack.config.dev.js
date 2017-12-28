/**
 * Webpack development config
 *
 * @Author: 刘谦 <qianliu>
 * @Date:   2016-09-06 11:37
 * @Email:  112486391@qq.com
 */

const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const { dllName, dllDir } = require('./webpack.config.dll')

const { HOST, PORT } = process.env

module.exports = webpackMerge({}, baseConfig, {
  // 编译方式
  devtool: 'eval',
  // 是否监听文件变化从而触发重新编译
  watch: true,
  // 输出
  output: {
    path: path.resolve(__dirname, 'bundle')
  },
  // 插件
  plugins: [
    // 模块热替换
    new webpack.HotModuleReplacementPlugin(),
    // 注入 webpack bundle 到 HTML
    new HtmlPlugin({
      template: './index.html',
      [dllName]: `${dllDir}/${dllName}.dll.js`
    })
  ],
  // 开发服务器
  devServer: {
    host: HOST,
    port: PORT,
    stats: {
      // 隐藏子级的信息
      children: false,
      // 隐藏包信息
      chunks: false,
      // 隐藏内置模块增加到包的信息
      chunkModules: false,
      // 隐藏内置的模块信息
      modules: false
    }
  }
})
