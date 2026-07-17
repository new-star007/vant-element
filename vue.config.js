const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  lintOnSave: false,
  css: {
    extract: true
  },
  configureWebpack: {
    externals: {
      vant: 'vant'
    }
  }
})
