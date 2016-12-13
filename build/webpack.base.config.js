const path = require('path')
const vueLoaderConfig = require('./vue-loader.config')

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './src/client-entry.js',
    // 抽出第三方模块
    vendor: [
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync'
    ]
  },
  output: {
    // 打包后资源的存放目录
    path: path.resolve(__dirname, '../dist'),
    // 服务器查找资源文件时，从哪里找
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    // 取别名
    alias: {
      src: path.resolve(__dirname, '../src'),
      views: path.resolve(__dirname, '../src/views'),
      utils: path.resolve(__dirname, '../src/utils'),
      assets: path.resolve(__dirname, '../src/assets')
    }
  },
  module: {
    // 这个包只编译一遍
    // noParse: [//],
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          objectAssign: 'Object.assign'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10,
          name: utils.assetsPath('images/[name].[ext]')
        }
      },
      {
        test: /\.styl$/,
        loader: 'vue-style-loader!css-loader!stylus-loader'
      }
    ]
  }
}

