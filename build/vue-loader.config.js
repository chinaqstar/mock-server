module.exports = {
  postcss: [
    require('autoprefixer')({
      // css 兼容市场占有1%以上的浏览器
      browsers: ['> 1%']
    })
  ]
}