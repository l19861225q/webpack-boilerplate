/**
 * Webpack dll config
 *
 * @Author: Liu Qian <qianliu>
 * @Email:  112486391@qq.com
 */

import path from 'path'
import webpack from 'webpack'
import CleanPlugin from 'clean-webpack-plugin'

const { NODE_ENV } = process.env
const isDev = NODE_ENV === 'development'

export const dllName = 'vendors'
export const dllDir = '/dll'
export const dllPath = path.join(__dirname, dllDir)
export const dllManifestPath = path.join(dllPath, `${dllName}-menifest.${NODE_ENV}.json`)

// Separate the 3rd libs
// 当 import xxx from 'xxx' 时，会从后面的 path 加载，保证加载的准确性，节省了搜索模块的时间
// 键名末尾追加 `$`，表示精准匹配
// https://fakefish.github.io/react-webpack-cookbook/Split-app-and-vendors.html
const alias = {
  // React
  'react$': path.resolve(__dirname, `./node_modules/react/cjs/${isDev
    ? 'react.development.js'
    : 'react.production.min.js'}`
  ),
  'react-dom$': path.resolve(__dirname, `./node_modules/react-dom/cjs/${isDev
    ? 'react-dom.development.js'
    : 'react-dom.production.min.js'}`
  )
}

export default {
  // 编译方式
  devtool: isDev ? 'eval' : false,
  // 入口
  entry: {
    [dllName]: ['react', 'react-dom']
  },
  // 输出
  output: {
    path: dllPath,
    filename: `[name].dll${!isDev ? '.min' : ''}.js`,
    library: '[name]_[hash]'
  },
  // 解析
  resolve: {
    alias
  },
  // 插件
  plugins: [
    new CleanPlugin(),
    new webpack.DllPlugin({
      path: dllManifestPath,
      name: '[name]_[hash]'
    })
  ].concat(!isDev
    ? new webpack.optimize.UglifyJsPlugin({ // 压缩 JS
      compress: { warnings: false },
    })
    : []
  )
}
