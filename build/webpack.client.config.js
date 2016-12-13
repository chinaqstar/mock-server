const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const base = require('./webpack.base.config')
const vueLoaderConfig = require('./vue-loader.config')

const config = merge.smart({}, base, {
  entry: {
    app: ['webpack-hot-middleware/client']
  },
  output: {
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // 定义环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // 抽取第三方包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // html模板
    new HTMLPlugin({
      template: 'src/index.template.html'
    })
  ]
})

if (process.env.NODE_ENV === 'production') {
  vueLoaderConfig.loader = {
    // 抽出vue中的stylus
    stylus: ExtractTextPlugin.extract({
      loader: 'css-loader!stylus-loader',
      fallbackLoader: 'vue-style-loader'
    })
  },
  config.plugins.push(
    new ExtractTextPlugin('styles.[hash].css'),
    // 压缩css
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // 压缩js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warings: false
      }
    })
  )
}

module.exports = config