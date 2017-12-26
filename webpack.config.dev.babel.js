/**
 * Webpack development config
 *
 * @Author: 刘谦 <qianliu>
 * @Date:   2016-09-06 11:37
 * @Email:  112486391@qq.com
 */

import path from 'path'
import webpack from 'webpack'
import HtmlPlugin from 'html-webpack-plugin'
import webpackMerge from 'webpack-merge'
import baseConfig from './webpack.config.base.js'
import { dllName, dllDir } from './webpack.config.dll.babel'

const { HOST, PORT_DEV } = process.env

export default webpackMerge({}, baseConfig, {
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
    port: PORT_DEV,
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
