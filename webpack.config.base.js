/**
 * Webpack base config
 *
 * @Author: 刘谦 <qianliu>
 * @Date:   2016-09-06 11:42
 * @Email:  112486391@qq.com
 */

/* eslint-disable import/first */
require('dotenv').config() // read ./.env

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const { NODE_ENV } = process.env
const isDev = NODE_ENV === 'development'

// Separate the 3rd libs
// 当 import xxx from 'xxx' 时，会从后面的 path 加载，保证加载的准确性，节省了搜索模块的时间
// 键名末尾追加 `$`，表示精准匹配
// https://fakefish.github.io/react-webpack-cookbook/Split-app-and-vendors.html
const alias = {
}

module.exports = {
  // 作用域
  context: __dirname,
  // 入口
  entry: {
    index: path.resolve(__dirname, 'src/index.js')
  },
  // 输出
  output: {
    filename: `[name]-[hash:8]${isDev ? '' : '.min'}.js`,
    chunkFilename: `[name]-chunk-[chunkhash:8]${isDev ? '' : '.min'}.js`,
    publicPath: '/',
  },
  // 模块
  module: {
    rules: [
      // 编译 ES6
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // babel-loader 可以缓存处理过的模块，对于没有修改过的文件不会再重新编译，
        // cacheDirectory 有着2倍以上的速度提升，这对于 rebuild 有着非常大的性能提升
        use: 'babel-loader?cacheDirectory'
      },
      // 处理 s?css
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize', 'postcss-loader', 'sass-loader'],
          // 替换 css 中的资源引用路径指向 /public/
          // publicPath: '../../'
        })
      },
      // 处理字体
      // 假设公共组件暂时不需要指定字体，以后需要时再补 conf
      {
        test: /\.(ttf|eot|woff2?)(\?v=[0-9]\.[0.9]\.[0-9])?$/,
        exclude: /node_modules/,
        use: 'file-loader?name=[name]-[hash:8].[ext]'
      },
      // 处理图片
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        exclude: /node_modules/,
        use: 'file-loader?name=[name]-[hash:8].[ext]'
      }
    ]
  },
  // 解析
  resolve: {
    alias,
    // 自动解析确定的扩展，引入模块时可不带后缀
    // e.g.
    // import File from '../path/to/file'
    extensions: [
      '.web.ts', '.web.tsx', '.web.js', '.web.jsx',
      '.ts', '.tsx',
      '.js', '.jsx',
      '.json'
    ],
    // 解析模块时应该搜索的目录
    modules: [
      // 减少构建搜索或编译路径，可以获得显著的性能提升
      path.resolve(__dirname, './src/'),
      'node_modules'
    ]
  },
  // 插件
  plugins: [
    // 这是一个通过 DefinePlugin 来设置 process.env 环境变量的快捷方式
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    // 提取公共 JS
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: `vendors-[hash:8]${isDev ? '' : '.min'}.js`,
    }),
    // 提取公共 CSS
    new ExtractTextPlugin(`style-[contenthash:8]${isDev ? '' : '.min'}.css`)
  ]
}
