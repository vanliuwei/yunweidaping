const path = require('path')

const resolve = dir => path.join(__dirname, dir)

// const baseUrl = process.env.NODE_ENV === 'production' ? '/' : '/'

module.exports = {
  lintOnSave: false,
  css: { sourceMap: true },
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    // 自动启动
    // open: true,
    // host: '10.125.8.211',
    host:'localhost',
    port: 3924,
    proxy: { // 配置跨域
      '/api': {
        target: 'http://10.125.8.40:3924/',
        // target:'http://10.0.42.60:3924/',
        // target:'http://10.125.8.123:3924/',
        ws: true,
        changOrigin: true,
        timeout: 5 * 60 * 1000,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // 跨域代理
    // proxy: {
    //   '/v1/fabric/': {
    //     target: 'http://10.125.146.109:8086',
    //     changeOrigin: true,
    //     ws: true,
    //     timeout: 5 * 60 * 1000,
    //     pathRewrite: {
    //       '^/v1/fabric/': '/'
    //     }
    //   },
    //   '/baasapi': {
    //     target: 'http://10.125.146.109:8086',
    //     changeOrigin: true,
    //     ws: true,
    //     timeout: 5 * 60 * 1000,
    //     pathRewrite: {
    //       '^/baasapi': '/baasapi'
    //     }
    //   }
    // }
  }
}
