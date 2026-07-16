const path = require('path')

module.exports = {
  lintOnSave: false,
  transpileDependencies: ['vant-element'],
  configureWebpack: {
    resolve: {
      alias: {
        'vant-element': path.resolve(__dirname, '../../packages/vant-element/src')
      }
    }
  }
}
