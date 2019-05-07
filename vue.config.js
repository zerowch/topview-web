const fs = require('fs')
const glob = require('glob')
// const _ = require('lodash')

// 简单学习 glob https://www.cnblogs.com/liulangmao/p/4552339.html
const pages = {}
let entries
let HAFList = []
try {
  entries = glob('src/pages/*/main.js', { sync: true })
} catch (err) {
  entries = []
  throw err
}
entries.forEach((file) => {
  const fileSplit = file.split('/')
  const pageName = fileSplit[2]
  // HAFList.push({ from: /\/login/, to: '/login.html' })
  HAFList.push({ from: new RegExp(`/${pageName}`), to: `/${pageName}.html` })
  let pageHtml = fileSplit.slice(0, 3).join('/') + '/index.html'
  if (!fs.existsSync(pageHtml)) {
    pageHtml = fileSplit.slice(0, 2).join('/') + '/_default.html'
  }
  pages[pageName] = {
    entry: file,
    template: pageHtml,
    filename: `${pageName}.html`
  }
})

module.exports = {
  pages,
  baseUrl: '/',
  outputDir: 'dist',
  lintOnSave: true,
  chainWebpack: () => {
    const env = (process.env.VUE_APP_ENV).toUpperCase()
    console.log(`当前环境: ${env}`)
  },
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {}
  },
  parallel: require('os').cpus().length > 1,
  pluginOptions: {},
  devServer: {
    open: false,
    openPage: '/index.html',
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 9000,
    https: false,
    hotOnly: false,
    proxy: null, // string | Object
    historyApiFallback: {
      rewrites: HAFList
    }
  }
}
