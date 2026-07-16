const path = require('path')

module.exports = {
  lintOnSave: false,
  transpileDependencies: ['@fengluo/vant-element'],
  configureWebpack: {
    resolve: {
      alias: {
        '@fengluo/vant-element': path.resolve(__dirname, '../../packages/vant-element/src')
      }
    }
  }
}
